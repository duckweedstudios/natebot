const { MessageEmbed, MessageButton } = require('discord.js');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');

module.exports = {
	name: 'serverStatsButton',
	data: new MessageButton()
		.setCustomId('serverStatsButton')
		.setLabel('Server Stats 📊')
		.setStyle('SUCCESS'),
    
	async execute(interaction) {
		const serverEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`__***SERVER STATS***__`)
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setDescription('*There will be server stuff here*')
			.setThumbnail('https://i.imgur.com/T9HDICa.jpeg');
    
		const finalComponents = await getActionRow(interaction);
            
		const data = { embeds : [serverEmbed], components: [finalComponents] };
    
		try {
			await editInteraction(interaction, data);
			await interaction.deferUpdate();
		} catch (error) {
			await interaction.reply({ content: 'There was an error', ephemeral: true });
			console.log(error);
		}
	},
};