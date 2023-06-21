const { MessageButton } = require('discord.js');
const { editPrompt } = require('../events/editPrompt');

module.exports = {
	name: 'nevermindButton',
	data: new MessageButton()
		.setCustomId('nevermindButton')
		.setLabel('Nevermind')
		.setStyle('DANGER'),

	async execute(interaction) {
		const data = { content: `:( Ok`, components : [] };
		await editPrompt(interaction, data);
		await interaction.deferUpdate();
		console.log('mom said no');
	},
};