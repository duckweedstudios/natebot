const { MessageButton } = require('discord.js');
const { joinBruhTest } = require('../actions/hauntings.js');

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER'),
        
	async execute(interaction) {
		joinBruhTest(interaction.member.guild);
		await interaction.reply({ content:'A soul was summoned', ephemeral: true });
	},
};