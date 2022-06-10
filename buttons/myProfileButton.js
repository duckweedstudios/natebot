const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");
const { getEmbed } = require('../embeds/getEmbed')
const { editInteraction } = require('../events/editInteraction')
const { getActionRow } = require('../events/getActionRow')

module.exports = {
	name: 'myProfileButton',
	data: new MessageButton()
	.setCustomId('myProfileButton')
	.setLabel('⬅ Back To My Profile')
	.setStyle('SUCCESS'),
	
	async execute(interaction) {
		let finalEmbed = await getEmbed(interaction, interaction.user)
		let finalComponents = await getActionRow(interaction)

		const data = {embeds : [finalEmbed], components : [finalComponents]}
		try {
			await editInteraction(interaction, data)
			await interaction.deferUpdate()
		} catch(error){
			await interaction.reply({content: 'Didnt work', ephemeral: true})
		}
	},
};

const helpButton = require('../buttons/helpButton');