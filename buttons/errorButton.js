const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'errorButton',
	data: new MessageButton()
    .setCustomId('errorButton')
    .setLabel('!!!ERROR!!!')
    .setStyle('DANGER')
    .setDisabled(true),

	async execute(interaction) {
		await interaction.deferUpdate()
	},
};