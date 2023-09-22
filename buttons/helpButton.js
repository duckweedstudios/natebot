const { MessageButton } = require('discord.js');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');
const { getHelpEmbed } = require('../embeds/getEmbed');
module.exports = {
	name: 'helpButton',
	data: new MessageButton()
		.setCustomId('helpButton')
		.setLabel('Need Help? 🤔')
		.setStyle('PRIMARY'),
    
	async execute(interaction) {
		const helpEmbed = await getHelpEmbed(interaction);
		const finalComponents = await getActionRow(interaction);
        
		const data = { embeds : [helpEmbed], components: [finalComponents] };

		try {
			await editInteraction(interaction, data);
			await interaction.deferUpdate();
		} catch (error) {
			await interaction.reply({ content: 'There was an error', ephemeral: true });
			console.log(error);
		}
	},
};

