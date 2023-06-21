const { SlashCommandBuilder } = require('@discordjs/builders');
const { getActionRow } = require('../events/getActionRow');
const { getEmbed } = require('../embeds/getEmbed');
const { isUserSetup, isGuildSetup } = require('../functions/isSetup.js');
const { deleteInteraction } = require('../events/deleteInteraction.js');

module.exports = {
	// Creating the Command
	data: new SlashCommandBuilder()
		.setName('souls')
		.setDescription('shows the souls you\'ve fetched')
		.addUserOption(option => option.setName('target').setDescription('The target user')),

	async execute(interaction) {
		let target = interaction.options.getUser('target');
		if (!interaction.options.getUser('target')) {
			target = interaction.user;
		}
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
		} else if (!await isUserSetup(interaction, interaction.user.id)) {
			interaction.reply({ content: 'You have not joined the soul fetchers!\n\nTo get started, use /join.', ephemeral: true });
		} else if (!await isUserSetup(interaction, target.id)) {
			interaction.reply({ content: 'This user has not joined the soul fetchers!\n\nPerhaps they are too weak', ephemeral: true });
		} else {
			try {
				const finalEmbed = await getEmbed(interaction, target);
				const finalComponents = await getActionRow(interaction, target);
				try {
					await interaction.reply({ embeds: [finalEmbed], components: [finalComponents], ephemeral: true });
					// Saves the Token
					interaction.client.usersCurrentMenuToken = { ...interaction.client.usersCurrentMenuToken, [interaction.user.id] : interaction.token };
					interaction.client.usersCurrentTarget = { ...interaction.client.usersCurrentTarget, [interaction.user.id] : target };
					setTimeout(() => deleteInteraction(interaction), 870000);
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
};
