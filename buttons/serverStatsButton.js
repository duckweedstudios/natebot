const { MessageEmbed, MessageButton } = require('discord.js');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');

module.exports = {
	name: 'serverStatsButton',
	data: new MessageButton()
		.setCustomId('serverStatsButton')
		.setLabel('Server Stats 📊')
		.setStyle('SECONDARY'),
    
	async execute(interaction) {
		const guildData = await getGuildData(interaction);
		const condemnedData = getSoulData(interaction, guildData.condemnedMember);
		const serverEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`__***${interaction.guild.name}'s Stats***__`)
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`*Haunted by ${condemnedData.fetcherTag}*`)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }));
    
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