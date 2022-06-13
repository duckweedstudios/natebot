const { MessageButton } = require('discord.js');


module.exports = {
	name: 'voicechatButton',
	data: new MessageButton()
		.setCustomId('voicechatButton')
		.setLabel('Lure/Dismiss 🔪')
		.setStyle('DANGER')
		.setDisabled(true),
        
	async execute(interaction) {
		await interaction.reply({ content:'This will lure or dismiss users from Hellspeak', ephemeral: true });
	},
};