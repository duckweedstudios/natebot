const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ButtonBuilder } = require("@discordjs/builders");

module.exports = {
	name: 'claimButton',
	data: new MessageButton()
    .setCustomId('claimButton')
    .setLabel('🔥🔥CLAIM🔥🔥')
    .setStyle('DANGER')
	.setDisabled(true),

	async execute(interaction) {
		await interaction.reply({content:'Will claim condemned soul role', ephemeral:true});
	},
};