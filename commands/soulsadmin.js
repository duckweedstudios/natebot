const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsadmin')
		.setDescription('server admin'),
	async execute(interaction) {
		return;
		await interaction.reply('this will be the admin embed');
	},
};