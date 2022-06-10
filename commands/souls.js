const { SlashCommandBuilder } = require('@discordjs/builders');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');
const cleanseButton = require('../buttons/cleanseButton');
const giftButton = require('../buttons/giftButton');
const helpButton = require('../buttons/helpButton');
const muteButton = require('../buttons/muteButton');
const myProfileButton  = require('../buttons/myProfileButton')
const newSoulButton = require('../buttons/newSoulButton');
const sacrificeButton = require('../buttons/sacrificeButton');
const serverStatsButton = require('../buttons/serverStatsButton');
const summonButton = require('../buttons/summonButton');
const voicechatButton = require('../buttons/voicechatButton');
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { getActionRow } = require('../events/getActionRow')
const axios = require('axios').default;
const { getEmbed } = require('../embeds/getEmbed')

module.exports = {
	// Creating the Command
	data: new SlashCommandBuilder()
		.setName('souls')
		.setDescription('shows the souls you\'ve fetched')
		.addUserOption(option => option.setName('target').setDescription('The target user')),

	async execute(interaction) {
		try {
			let target = interaction.options.getUser('target')
			if (!interaction.options.getUser('target')) {
				target = interaction.user
			}
			const finalEmbed = await getEmbed(interaction, target)
			let finalComponents = await getActionRow(interaction, target)
			try {
				await interaction.reply({embeds: [finalEmbed], components: [finalComponents], ephemeral: true})
				// Saves the Token
				interaction.client.usersCurrentMenuToken = {...interaction.client.usersCurrentMenuToken, [interaction.user.id] : interaction.token}
				interaction.client.usersCurrentTarget = {...interaction.client.usersCurrentTarget, [interaction.user.id] : target}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	}
};
