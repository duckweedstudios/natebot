const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");
const { editPrompt } = require('../events/editPrompt')

module.exports = {
	name: 'nevermindButton',
	data: new MessageButton()
    .setCustomId('nevermindButton')
    .setLabel('Nevermind')
    .setStyle('DANGER'),

	async execute(interaction) {
        data = {content: `Ok bye bitch`, components : []}
        await editPrompt(interaction, data)
		await interaction.deferUpdate()
        console.log('mom said no')
	},
};