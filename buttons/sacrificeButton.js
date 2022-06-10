const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'sacrificeButton',
	data: new MessageButton()
    .setCustomId('sacrificeButton')
    .setLabel('Sacrifice 🩸')
    .setStyle('DANGER'),
    
	async execute(interaction) {
		await interaction.reply({content:'This will bring up the Sacrifice Menu', ephemeral: true});
	},
};