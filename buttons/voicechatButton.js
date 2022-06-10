const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'voicechatButton',
	data: new MessageButton()
    .setCustomId('voicechatButton')
    .setLabel('Lure/Dismiss 🔪')
    .setStyle('DANGER'),
    
	async execute(interaction) {
		await interaction.reply({content:'This will lure or dismiss users from Hellspeak', ephemeral: true});
	},
};