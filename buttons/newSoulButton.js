const { MessageButton } = require('discord.js');

module.exports = {
	name: 'newSoulButton',
	data: new MessageButton()
		.setCustomId('newSoulButton')
		.setLabel('Create New Soul 👻')
		.setStyle('SECONDARY'),
    
	async execute(interaction) {
		await interaction.reply({ content:'[Soul Creation Menu]', ephemeral: true });
	},
};