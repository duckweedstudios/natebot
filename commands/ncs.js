const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const profileModelGuild = require ('../models/profileSchemaGuild');
const { isMemberDev, isMemberCondemnedSoulWithGuildQuery, canModerateMember } = require('../functions/privileges.js');
const { increaseValue } = require('../functions/inc');
const { setValue } = require('../functions/set');
const { getGuildData } = require('../events/guildquery.js');
const { getCondemnedRoleOnServer } = require('../functions/roles.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ncs')
		.setDescription('New condemned Soul')
		.addUserOption(option => option.setName('target').setDescription('The New Condemned Soul').setRequired(true)),
	async execute(interaction) {
		// Check for admin status (for now only developers have access)
		const condemnedTarget = interaction.options.getMember('target');
		if (!isMemberDev(interaction.member.id)) {
			interaction.reply({ content: 'You must be a developer to use this command!', ephemeral: true });
			return;
		}
		let guildData;
		try {
			guildData = await getGuildData(interaction.guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			// console.error(`Error in /makecondemned: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
			interaction.reply({ content: 'This command failed. Most likely, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}

		// Ensure target isn't a bot
		if (condemnedTarget.bot) {
			if (condemnedTarget.id === '974345779349184542') {
				interaction.reply({ content: 'I am flattered, but I must refuse. Choose a user instead.', ephemeral: true });
				return;
			} else {
				interaction.reply({ content: 'A puny bot cannot bear the mantle of Condemned Soul. Choose a user instead.', ephemeral: true });
				return;
			}
		}
		// Check if target is already condemned
		if (isMemberCondemnedSoulWithGuildQuery(condemnedTarget, guildData)) {
			interaction.reply({ content: 'This user is already the condemned', ephemeral: true });
			return;
		}
		// Check if the bot has permissions to change the roles of the target
		// Often, it will not have permission to moderate the server owner
		// Everything else can still occur (eg assigning them condemned in the database)
		// But we must ask them to manually assign the role in Discord
		let roleAssignmentSuccess = true;
		if (!canModerateMember(condemnedTarget)) {
			console.log(`Cannot moderate ${condemnedTarget.user.tag}`);
			roleAssignmentSuccess = false;
		}

		try {
			const profile = await profileModel.create({
				fetcherTag: condemnedTarget.user.username,
				fetcherID: condemnedTarget.id,
				serverID: condemnedTarget.guild.id,
				souls: 100,
				soulsCaught: 0,
				careerSouls: 0,
				condemnedCount: 0,
				soulXP: 0,
				fetchCount: 0,
				gotFooledCount: 0,
				fooledCount: 0,
				autoLure: false,
			});
			profile.save();
		} catch (error) {}

		//Adjusting profile values
		const allfetchers = await profileModel.find({ serverID: interaction.guild.id });
		try {
			for (const fetcher of allfetchers) {
				setValue(interaction, fetcher.fetcherID, 'souls', 0);
				setValue(interaction, fetcher.fetcherID, 'soulsCaught', 0);
			}
			setValue(interaction, condemnedTarget.id, 'souls', 100);
			setValue(interaction, condemnedTarget.id, 'soulsCaught', 0);
			increaseValue(interaction, condemnedTarget.id, 'condemnedCount', 1);
			await profileModelGuild.findOneAndUpdate({ serverId: interaction.guild.id }, {
				$set: {
					condemnedMember: condemnedTarget.id,
				} });
			interaction.reply({ content: `${condemnedTarget.user.username} has become **T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓**\n\n**FETCH ME THEIR SOULS!**`});
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error', ephemeral: true });
		}
	},
};