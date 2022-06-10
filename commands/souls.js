const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActionRow } = require('../events/getActionRow');
const { getEmbed } = require('../embeds/getEmbed');

module.exports = {
	// Creating the Command
	data: new SlashCommandBuilder()
		.setName('souls')
		.setDescription('shows the souls you\'ve fetched')
		.addUserOption(option => option.setName('target').setDescription('The target user')),

	async execute(interaction) {
		try {
			let target = interaction.options.getUser('target');
			if (!interaction.options.getUser('target')) {
				target = interaction.user;
			}
			const finalEmbed = await getEmbed(interaction, target);
			const finalComponents = await getActionRow(interaction, target);
			try {
				await interaction.reply({ embeds: [finalEmbed], components: [finalComponents], ephemeral: true });
				// Saves the Token
				interaction.client.usersCurrentMenuToken = { ...interaction.client.usersCurrentMenuToken, [interaction.user.id] : interaction.token };
				interaction.client.usersCurrentTarget = { ...interaction.client.usersCurrentTarget, [interaction.user.id] : target };
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
