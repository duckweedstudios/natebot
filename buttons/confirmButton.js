const { MessageButton } = require('discord.js');
const { editPrompt } = require('../events/editPrompt');
const { editInteraction } = require('../events/editInteraction');
const { increaseValue } = require('../functions/inc');
const { getSoulData } = require('../events/query');

module.exports = {
	name: 'confirmButton',
	data: new MessageButton()
		.setCustomId('confirmButton')
		.setLabel('Confirm')
		.setStyle('SUCCESS'),

	async execute(interaction) {
		const target = interaction.client.usersCurrentTarget[interaction.user.id];
		const value = (interaction.message.content.split(' a total of **'))[1].replace(/\D/g, '');
		const senderSouls = await getSoulData(interaction, interaction.user.id);
		let plural = '';
		if (value === 1) {
			plural = 'soul';
		} else {
			plural = 'souls';
		}
		const failData = { content: `You do not have enough souls!`, components : [] };
		const data = { content: `You have given **${target.username}** a total of **${value} ${plural}!**`, components : [] };
		try {
			if (value > senderSouls.souls) {
				await editPrompt(interaction, failData);
				await interaction.deferUpdate();
			} else {
				await increaseValue(interaction, target.id, 'souls', value);
				await increaseValue(interaction, interaction.user.id, 'souls', -value);
				await editPrompt(interaction, data);
				await interaction.deferUpdate();
			}
		} catch (error) {
			console.log(error);
			await editPrompt(interaction, { content: `ERROR: Database operations error!`, components : [] });
			await editInteraction(interaction);
		}
	},
};