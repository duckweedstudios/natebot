const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
    .setCustomId('summonButton')
    .setLabel('Summon 😈')
    .setStyle('DANGER'),
    
	async execute(interaction) {
		await interaction.reply({content:'A soul was summoned to [VOICECHANNEL]', ephemeral: true});
	},
};