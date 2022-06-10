const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsserver')
		.setDescription('server stats'),
	async execute(interaction) {
		await interaction.reply('this will be the server stats');
	},
};