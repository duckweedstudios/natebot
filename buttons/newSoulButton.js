const { MessageButton } = require('discord.js');

module.exports = {
	name: 'newSoulButton',
	data: new MessageButton()
		.setCustomId('newSoulButton')
		.setLabel('Create New Soul 👻')
		.setStyle('SECONDARY')
		.setDisabled(true),
        
	async execute(interaction) {
		await interaction.reply({ content:'[Soul Creation Menu]', ephemeral: true });
	},
};