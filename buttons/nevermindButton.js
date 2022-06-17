const { MessageButton } = require('discord.js');
const { editPrompt } = require('../events/editPrompt');

module.exports = {
	name: 'nevermindButton',
	data: new MessageButton()
		.setCustomId('nevermindButton')
		.setLabel('Nevermind')
		.setStyle('DANGER'),

	async execute(interaction) {
		await interaction.deferUpdate();
		const data = { content: `You have chosen poorly`, components : [] };
		await editPrompt(interaction, data);
	},
};