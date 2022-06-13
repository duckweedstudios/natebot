const { MessageEmbed, MessageButton } = require('discord.js');
const { editInteraction } = require('../events/editInteraction');
const { getActionRow } = require('../events/getActionRow');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');
const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'serverStatsButton',
	data: new MessageButton()
		.setCustomId('serverStatsButton')
		.setLabel('Server Stats 📊')
		.setStyle('SECONDARY'),
    
	async execute(interaction) {
		const guildData = await getGuildData(interaction);
		const condemnedData = await getSoulData(interaction, guildData.condemnedMember);
		const allFetchersDataOne = await profileModel.find({ serverID: interaction.guild.id }).sort({ souls: -1, soulsCaught: -1 });
		const allFetchersData = [];
		for (const i in allFetchersDataOne) {
			if (allFetchersDataOne[i].fetcherID !== condemnedData.fetcherID) {
				allFetchersData.push(allFetchersDataOne[i]);
			}
		}
		const serverEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`__***${interaction.guild.name}'s Stats***__`)
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields(
				{ name: '__**THE CONDEMNED SOUL**__ ', value: `**${condemnedData.fetcherTag}**` },
			)
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Next Appearance', value: `*${guildData.schedule.next.time}*` },
				{ name: 'Last Appearance', value: `*${guildData.schedule.past.time}*` },
				{ name: '\u200B', value: '\u200B' });
		
		try {
			serverEmbed.addFields({ name: '__**Top Users**__', value: `__**#1 - ${allFetchersData[0].fetcherTag}:**__ ${allFetchersData[0].souls} souls\n__**#2 - ${allFetchersData[1].fetcherTag}:**__ ${allFetchersData[1].souls} souls\n__**#3 - ${allFetchersData[2].fetcherTag}:**__ ${allFetchersData[2].souls} souls` });
		} catch (error) {
			serverEmbed.addFields({ name: '__**Top Users**__', value: 'Not Enough Users' });
		}
		serverEmbed.setImage('https://i.imgur.com/bJDpP4T.jpeg');
		serverEmbed.setTimestamp();
		serverEmbed.setFooter({ text: 'Powered by Parkie LLC' });
    
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