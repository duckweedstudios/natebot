const { MessageButton } = require('discord.js');
const { attemptSummoning } = require('../actions/summoning.js');
const { SummonAttemptResults } = require('../actions/summoning.js');
const { deletePrompt } = require('../events/deletePrompt');
const { editPrompt } = require('../events/editPrompt');

module.exports = {
	name: 'summonButton',
	data: new MessageButton()
		.setCustomId('summonButton')
		.setLabel('Summon 😈')
		.setStyle('DANGER'),
        
	async execute(interaction) {
		const { summonSuccess, cooldown } = await attemptSummoning(interaction.client, interaction.member.guild);
		if (summonSuccess === SummonAttemptResults.Success) {
			try {
				deletePrompt(interaction.client.usersCurrentPrompt[interaction.user.id]);
			} catch (error) {
				console.log(' ');
			}
			interaction.reply({ content: `A soul was summoned! Let's see if someone takes the bait...`, ephemeral: true });
			interaction.client.usersCurrentPrompt = { ...interaction.client.usersCurrentPrompt, [interaction.user.id] : interaction.token };
			// Creating Content for Prompt Editing

			const fooledData = { content: `You fooled x fetchers!`, components : [] };
			setTimeout(() => editPrompt(interaction, fooledData), 23000);
			setTimeout(() => deletePrompt(interaction.token), 300000);
		} else if (summonSuccess === SummonAttemptResults.Cooldown) {
			await interaction.reply({ content:`You cannot summon a soul for ${cooldown}.`, ephemeral: true });
		} else if (summonSuccess === SummonAttemptResults.TooSoonAfterRealHaunting) {
			await interaction.reply({ content:`You cannot summon a soul for ${cooldown} because a real haunting has occurred recently.`, ephemeral: true });
		}
	},
};