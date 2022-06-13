const { MessageButton } = require('discord.js');

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER')
		.setDisabled(true),
        
	async execute(interaction) {
		await interaction.reply({ content:'A soul was summoned to [VOICECHANNEL]', ephemeral: true });
	},
};