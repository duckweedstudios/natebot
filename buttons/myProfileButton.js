const { MessageButton } = require('discord.js');
const { getEmbed } = require('../embeds/getEmbed');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');

module.exports = {
	name: 'myProfileButton',
	data: new MessageButton()
		.setCustomId('myProfileButton')
		.setLabel('⬅ Back To My Profile')
		.setStyle('SUCCESS'),
	
	async execute(interaction) {
		await interaction.deferUpdate();
		const finalEmbed = await getEmbed(interaction, interaction.user);
		const finalComponents = await getActionRow(interaction);

		const data = { embeds : [finalEmbed], components : [finalComponents] };
		try {
			await editInteraction(interaction, data);
			interaction.client.usersCurrentTarget = { ...interaction.client.usersCurrentTarget, [interaction.user.id] : interaction.user.id };
		} catch (error) {
			console.error('Error in myProfileButton.js: ' + error);
			return;
		}
	},
};