const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summon')
		.setDescription('the funny'),
	async execute(interaction) {
		await interaction.reply('this will summon the bot to juke people out');
	},
};