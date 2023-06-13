const { MessageButton } = require('discord.js');
const { hauntSomeChannelWithSoul } = require('../actions/hauntings.js');
const { getWeightedRandomSoulType } = require('../functions/souls.js');


module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER'),
        
	async execute(interaction) {
		hauntSomeChannelWithSoul(interaction.member.guild, getWeightedRandomSoulType(interaction.member.guild.id));
		await interaction.reply({ content:'A soul was summoned', ephemeral: true });
	},
};