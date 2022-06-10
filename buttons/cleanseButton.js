const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'cleanseButton',
	data: new MessageButton()
    .setCustomId('cleanseButton')
    .setLabel('Cleanse Voice Channel 🧹')
    .setStyle('DANGER'),

	async execute(interaction) {
		await interaction.reply({content:'Voice Channel was Cleansed', ephemeral:true});
	},
};