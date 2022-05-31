const { SlashCommandBuilder } = require('@discordjs/builders');
const { getServerDataFromMemory } = require('../functions/serverData.js');
const { isMemberPrivileged } = require('../functions/privileges.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('[admin] Resume Natebot activities on this server'),
	async execute(interaction) {
		// Check whether Natebot has already been setup
		const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
		if (serverDataObject === null) {
			interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
			return;
		}
		// TODO: Check for admin status
		if (isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		// TODO: Check whether Natebot is already unpaused on this server
		// eslint-disable-next-line no-constant-condition
		if (false) {
			interaction.reply({ content: 'The Natebot is already unpaused.', ephemeral: true });
			return;
		}
		//
		// TODO: Save to database that this server is setup
		// Perhaps by modifying a flag rather than adding to the database

		// TODO: Check whether hauntings have been skipped while paused
		// We will not make up for missed hauntings or soul decay,
		// but we must regenerate the haunting schedule
		interaction.reply('All temporal Natebot functions (hauntings, soul decay) have resumed.');
	},
};