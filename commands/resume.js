const { SlashCommandBuilder } = require('@discordjs/builders');
// const { getServerDataFromMemory } = require('../functions/serverData.js');
// const { getGuildData } = require('../events/guildquery.js');
// const { isMemberDev } = require('../functions/privileges.js');
// const profileModelGuild = require('../models/profileSchemaGuild.js');
const { isGuildSetup } = require('../functions/isSetup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('[admin] Resume Natebot activities on this server'),
	async execute(interaction) {
		// Not intended to be used yet
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
		} else {
			await interaction.reply({ content: '🚧 this will be the resume command 🚧', ephemeral: true });
		}

		// Check whether Natebot has already been setup
		// const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
		// if (serverDataObject === null) {
		// 	interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
		// 	return;
		// }

		/*
		let guildData;
		try {
			guildData = await getGuildData(interaction.guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			// console.error(`Error in /pause: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
			interaction.reply({ content: 'This command failed. Most likely, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}
		// Check for admin status (for now, only developers have access)
		if (!isMemberDev(interaction.member.id)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		// Check whether Natebot is already unpaused on this server
		if (!guildData.settings.paused) {
			interaction.reply({ content: 'The Natebot is already unpaused.', ephemeral: true });
			return;
		}

		// TODO: Save to database that this server is setup
		// TODO: ensure no other settings are lost
		try {
			guildData.settings.paused = false;
			await guildData.save();
		} catch (err) {
			console.error(`Error in /resume: Could not update information in database for server ${interaction.guild.id}: ${err}`);
			interaction.reply({ content: 'This command failed. Possibly, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}

		// TODO: Check whether hauntings have been skipped while paused
		// We will not make up for missed hauntings or soul decay,
		// but we must regenerate the haunting schedule
		interaction.reply('All temporal Natebot functions (hauntings, soul decay) have resumed.');
        */
	},
};