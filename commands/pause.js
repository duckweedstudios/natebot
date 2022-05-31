const { SlashCommandBuilder } = require('@discordjs/builders');
const { getServerDataFromMemory } = require('../functions/serverData.js');
const { isMemberPrivileged } = require('../functions/privileges.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('[admin] Pause Natebot activities on this server'),
	async execute(interaction) {
		// Check whether Natebot has already been setup
		const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
		if (serverDataObject === null) {
			interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
			return;
		}
		// Check for admin status
		if (isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		// Check whether Natebot is already paused on this server
		if (serverDataObject.paused) {
			interaction.reply({ content: 'The Natebot is already paused.', ephemeral: true });
			return;
		}
		//
		// TODO: Save to database that this server is paused
		// Perhaps via a flag, rather than removing from the database?
		interaction.reply('All temporal Natebot functions (hauntings, soul decay) are paused.');
	},
};