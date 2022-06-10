const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'newSoulButton',
	data: new MessageButton()
    .setCustomId('newSoulButton')
    .setLabel('Create New Soul 👻')
    .setStyle('SECONDARY'),
    
	async execute(interaction) {
		await interaction.reply({content:'[Soul Creation Menu]', ephemeral: true});
	},
};