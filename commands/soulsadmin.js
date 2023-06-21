const { SlashCommandBuilder } = require('@discordjs/builders');
const { isGuildSetup } = require('../functions/isSetup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsadmin')
		.setDescription('server admin')
		.addUserOption(userOption => userOption
			.setName('reset-defaults').setDescription('Reset the server to default settings').setRequired(false))
		.addUserOption(userOption => userOption
			.setName('mean-delay').setDescription('Set the mean delay between haunts in minutes (default 1440 = 1 day)').setRequired(false))
		.addUserOption(userOption => userOption
			.setName('variation').setDescription('Set the variation of the delay between haunts from 1 to 10').setRequired(false)),
	async execute(interaction) {
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
		} else {
			// await interaction.reply({ content : '🚧 this will be the admin embed 🚧', ephemeral : true });
            
		}
	},
};