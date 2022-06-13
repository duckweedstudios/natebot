const { MessageButton } = require('discord.js');
const { editPrompt } = require('../events/editPrompt');
const { editInteraction } = require('../events/editInteraction');
// const { increaseValue } = require('../events/inc');
// const { setValue } = require('../events/set');
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
		const failData = { content: `ERROR: You do not have enough souls!`, components : [] };
		const data = { content: `You have given **${target.username}** a total of **${value} ${plural}!**`, components : [] };
		try {
			if (value > senderSouls.souls) {
				await editPrompt(interaction, failData);
				await editInteraction(interaction);
				await interaction.deferUpdate();
			} else {
				await editPrompt(interaction, data);
				await editInteraction(interaction);
				await interaction.deferUpdate();
			}
		} catch (error) {
			console.log(error);
			interaction.reply({ content: 'There was an error sending this gift', ephemeral: true });
		}
	},
};