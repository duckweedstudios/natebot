const { MessageButton } = require('discord.js');
const { deletePrompt } = require('../events/deletePrompt');

module.exports = {
	name: 'nevermindButton',
	data: new MessageButton()
		.setCustomId('nevermindButton')
		.setLabel('Nevermind')
		.setStyle('DANGER'),

	async execute(interaction) {
		await deletePrompt(interaction.client.usersCurrentPrompt[interaction.user.id]);
		await interaction.deferUpdate();
	},
};