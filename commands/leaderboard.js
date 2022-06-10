const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows the standings of all users'),
	async execute(interaction) {
		await interaction.reply('will create a leaderboard of who has fetched the most souls');
	},
};