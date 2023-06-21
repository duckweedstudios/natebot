const { SlashCommandBuilder } = require('@discordjs/builders');
const { isUserSetup, isGuildSetup } = require('../functions/isSetup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsadmin')
		.setDescription('server admin'),
	async execute(interaction) {
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
		} else {
			await interaction.reply({ content : '🚧 this will be the admin embed 🚧', ephemeral : true });
		}
	},
};