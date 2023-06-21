const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsadmin')
		.setDescription('server admin'),
	async execute(interaction) {
		await interaction.reply({ content : '🚧 this will be the admin embed 🚧', ephemeral : true });
	},
};