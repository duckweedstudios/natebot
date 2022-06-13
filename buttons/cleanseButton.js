const { MessageButton } = require('discord.js');

module.exports = {
	name: 'cleanseButton',
	data: new MessageButton()
		.setCustomId('cleanseButton')
		.setLabel('Cleanse Voice Channel 🧹')
		.setStyle('DANGER')
		.setDisabled(true),
        
	async execute(interaction) {
		await interaction.reply({ content:'Voice Channel was Cleansed', ephemeral:true });
	},
};