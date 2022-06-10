const { MessageButton } = require('discord.js');
const { editPrompt } = require('../events/editPrompt');
const { editInteraction } = require('../events/editInteraction');

module.exports = {
	name: 'confirmButton',
	data: new MessageButton()
		.setCustomId('confirmButton')
		.setLabel('Confirm')
		.setStyle('SUCCESS'),

	async execute(interaction) {
		const data = { content: `You have given souls`, components : [] };
		await editPrompt(interaction, data);
		await editInteraction(interaction);
		await interaction.deferUpdate();
		await console.log('success');
	},
};