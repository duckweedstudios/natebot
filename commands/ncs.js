const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const { isMemberPrivileged } = require('../functions/privileges.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ncs')
		.setDescription('New condemned Soul')
		.addUserOption(option => option.setName('target').setDescription('The New Condemned Soul')),
	async execute(interaction) {
		// TODO: Combine makecondemned into this command
		// Check for admin status
		if (!isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		const condemned = interaction.options.getUser('target');
		if (!condemned) {
			return interaction.reply({ content: `Please provide a user to make the new condemned soul!`, ephemeral: true });
		} else {
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
				console.log('wiped all users');
				await profileModel.findOneAndUpdate({ fetcherID:condemned.id }, {
					$set: {
						souls: 100,
						soulsCaught: 0,
					},
				});
				console.log('set new condemned');
				interaction.reply(`${condemned.tag} has become the CONDEMNED`);
			} catch (error) {
				console.log(error);
				interaction.reply('There was an error');
			}
		}
	},
};