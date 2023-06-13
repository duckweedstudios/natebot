const { MessageButton } = require('discord.js');
const { attemptSummoning } = require('../actions/summoning.js');

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER'),
        
	async execute(interaction) {
		const { summonSuccess, cooldown } = await attemptSummoning(interaction.client, interaction.member.guild);
		if (summonSuccess) {
			await interaction.reply({ content:`A soul was summoned! You can summon again in ${cooldown}.`, ephemeral: true });
		} else {
			await interaction.reply({ content:`You cannot summon a soul for ${cooldown}.`, ephemeral: true });
		}
	},
};