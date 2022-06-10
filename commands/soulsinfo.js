const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsinfo')
		.setDescription('info on the Souls Bot'),
	async execute(interaction) {
		await interaction.reply('this will be the info embed');
	},
};