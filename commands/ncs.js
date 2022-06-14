const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const profileModelGuild = require ('../models/profileSchemaGuild');
const { isMemberPrivileged } = require('../functions/privileges.js');
const { getGuildData } = require('../events/guildquery.js');
const { getCondemnedRoleOnServer } = require('../functions/roles.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ncs')
		.setDescription('New condemned Soul')
		.addUserOption(option => option.setName('target').setDescription('The New Condemned Soul')),
	async execute(interaction) {
		// TODO: Combine makecondemned into this command
		// Check for admin status
		const condemned = interaction.options.getUser('target');
		if (!isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		try {
			const _guildData = await getGuildData(interaction.guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			// console.error(`Error in /makecondemned: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
			interaction.reply({ content: 'This command failed. Most likely, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}
		const guildData = await getGuildData(interaction.guild.id);
		// Ensure a user was selected
		if (!condemned) {
			interaction.reply({ content: `Please provide a user to make the new condemned soul!`, ephemeral: true });
			return;
		}

		// Ensure target isn't a bot
		if (condemned.bot) {
			if (condemned.id === '974345779349184542') {
				interaction.reply({ content: 'I am flattered, but I must refuse. Choose a user instead.', ephemeral: true });
				return;
			} else {
				interaction.reply({ content: 'A puny bot cannot bear the mantle of Condemned Soul. Choose a user instead.', ephemeral: true });
				return;
			}
		} else if (condemned.id === guildData.condemnedMember) {
			interaction.reply({ content: 'This user is already the condemned', ephemeral: true });
		} else {
			const condemnedRole = await getCondemnedRoleOnServer(interaction.guild);
			for (const condemnedSoul of condemnedRole.members.entries()) {
				condemnedSoul[1].roles.remove(condemnedRole, 'Condemned role was force removed by an admin');
			}
			const allfetchers = await profileModel.find({ serverID: interaction.guild.id });
			try {
				for (const tempfetcherID of allfetchers) {
					const fetcherID = tempfetcherID['fetcherID'];
					console.log(fetcherID);
					await profileModel.findOneAndUpdate({ fetcherID:fetcherID }, {
						$set: {
							souls: 0,
							soulsCaught: 0,
						} });
				}
				await profileModelGuild.findOneAndUpdate({ serverId: interaction.guild.id }, {
					$set: {
						condemnedMember: condemned.id,
					} });
				console.log('wiped all users');
				await profileModel.findOneAndUpdate({ fetcherID:condemned.id }, {
					$set: {
						souls: 100,
						soulsCaught: 0,
					},
				});
				await profileModel.findOneAndUpdate({ fetcherID: condemned.id }, {
					$inc: {
						condemnedCount: 1,
					},
				});
				console.log('Updated condemned profile');
				// Erase the condemned role from all who have it
				console.log(condemned);
				const member = interaction.guild.members.cache.get(condemned.id);
				for (const condemnedSoul of condemnedRole.members.entries()) {
					condemnedSoul[1].roles.remove(condemnedRole, 'Condemned role was force removed by an admin');
				}
				// Give the condemned role to the new target and update stored data;
				member.roles.add(condemnedRole);
				console.log('set new condemned');
				interaction.reply(`${condemned.tag} has become the CONDEMNED\nFETCH ME THEIR SOULS!`);
			} catch (error) {
				console.log(error);
				interaction.reply('There was an error');
			}
		}
	},
};