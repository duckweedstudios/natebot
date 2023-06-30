const { MessageButton } = require('discord.js');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');
const { getServerStatsEmbed } = require('../embeds/getEmbed');

module.exports = {
	name: 'serverStatsButton',
	data: new MessageButton()
		.setCustomId('serverStatsButton')
		.setLabel('Server Stats 📊')
		.setStyle('SECONDARY'),
    
	async execute(interaction) {
		
		const finalComponents = await getActionRow(interaction);
		const serverEmbed = await getServerStatsEmbed(interaction);
		const data = { embeds : [serverEmbed], components: [finalComponents] };
    
		try {
			await editInteraction(interaction, data);
			await interaction.deferUpdate();
		} catch (error) {
			// await interaction.reply({ content: 'There was an error', ephemeral: true });
			console.log(error);
		}
	},
};