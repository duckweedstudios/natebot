const { MessageButton } = require('discord.js');
const { attemptSummoning } = require('../actions/summoning.js');
const { SummonAttemptResults } = require('../actions/summoning.js');

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER'),
        
	async execute(interaction) {
		const { summonSuccess, cooldown } = await attemptSummoning(interaction.client, interaction.member.guild);
		if (summonSuccess === SummonAttemptResults.Success) {
			await interaction.reply({ content:`A soul was summoned! You can summon again in ${cooldown}.`, ephemeral: true });
		} else if (summonSuccess === SummonAttemptResults.Cooldown) {
			await interaction.reply({ content:`You cannot summon a soul for ${cooldown}.`, ephemeral: true });
		} else if (summonSuccess === SummonAttemptResults.TooSoonAfterRealHaunting) {
			await interaction.reply({ content:`You cannot summon a soul for ${cooldown} because a real haunting has occurred recently.`, ephemeral: true });
		}
	},
};