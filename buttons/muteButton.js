const { MessageButton } = require('discord.js');

module.exports = {
	name: 'muteButton',
	data: new MessageButton()
		.setCustomId('muteButton')
		.setLabel('Mute 🤬')
		.setStyle('SECONDARY'),
        
	async execute(interaction) {
		await interaction.reply({ content:'This will mute the selected user', ephemeral:true });
	},
};