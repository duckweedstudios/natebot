const { MessageButton } = require('discord.js');
const { getUserEmbed } = require('../embeds/getEmbed');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');

module.exports = {
	name: 'backButton',
	data: new MessageButton()
		.setCustomId('backButton')
		.setLabel('⬅ Back')
		.setStyle('SUCCESS'),
	
	async execute(interaction) {
		const target = interaction.client.usersCurrentTarget[interaction.user.id];
		const finalEmbed = await getUserEmbed(interaction, target);
		const finalComponents = await getActionRow(interaction, target);

		const data = { embeds : [finalEmbed], components : [finalComponents] };
		try {
			await editInteraction(interaction, data);
			await interaction.deferUpdate();
		} catch (error) {
			console.error('Error in myProfileButton.js: ' + error);
			return;
		}
	},
};