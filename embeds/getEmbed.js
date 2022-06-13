const { MessageEmbed } = require('discord.js');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');

module.exports = {
	getEmbed : async (interaction, target) => {
		const guild = interaction.guild;
		let self = false;
		let targetIsCondemned = false;
		let userIsCondemned = false;
		let soulData;
		let guildData;
		try {
			guildData = await getGuildData(guild.id);
			if (!guildData) {
				interaction.reply({ content:'This guild has not set up the bot yet', ephemeral: true });
				return;
			}
		} catch (err) {
			interaction.reply({ content: err, ephemeral: true });
			return;
		}
		try {
			soulData = await getSoulData(interaction, target.id);
			if (!soulData) {
				interaction.reply({ content:'This user has not joined the soul fetchers', ephemeral: true });
				return;
			}
		} catch (err) {
			interaction.reply({ content: err, ephemeral: true });
			return;
		}

		// Determinations
		if (target === interaction.user) { self = true; }
		if (guildData.condemnedMember === target.id) { targetIsCondemned = true; }
		if (guildData.condemnedMember === interaction.user.id) { userIsCondemned = true; }
	
		// Defining Embeds
		// Error Embed
		const errorEmbed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`__***EMBED ERROR***__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*There was an error when producing this embed*')
			.setThumbnail('https://i.imgur.com/T9HDICa.jpeg')
			.setTimestamp();

		// Condemned Self Embed
		const condemnedSelfEmbed = new MessageEmbed()
			.setColor('DARK_RED')
			.setTitle(`__**Your Profile**__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*THE CONDEMNED SOUL*')
			.setThumbnail('https://imgur.com/MXLHd9R.png')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Your Souls Left__', value: `*${soulData.souls}*` },
				{ name: '__Spent Souls__', value: `*${(100 - soulData.soulsCaught - soulData.souls)}*`, inline: true },
				{ name: '__Souls Stolen__', value: `*${soulData.soulsCaught}*`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__**Condemned Career Stats**__', value: `\u200B` },
				{ name: '__Times as Condemned__', value: `*${soulData.condemnedCount}*` },
				{ name: '__Fetcher Rank__', value: `*${soulData.soulXP}*`, inline: true },
				{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: 'Powered by Parkie LLC' });

		// Condemned Other Embed
		const condemnedOtherEmbed = new MessageEmbed()
			.setColor('DARK_ORANGE')
			.setTitle(`__**${target.username}'s profile**__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*//Professional Soul Fetcher//*')
			.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
			.addFields(
				{ name: 'XP:', value: `${soulData.soulXP}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Current Souls:__', value: `*${soulData.souls}*` },
				{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
				{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__**Career Stats**:__', value: '\u200B' },
				{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
				{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
				{ name: '__Rank:__', value: `*${soulData.soulXP}*` },
			)
			.setTimestamp()
			.setFooter({ text: 'Powered by Parkie LLC' });
	
		// Fetcher Self Embed
		const fetcherSelfEmbed = new MessageEmbed()
			.setColor('RED')
			.setTitle(`__**Your Profile**__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*Professional Soul Fetcher*')
			.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
			.addFields(
				{ name: 'Your XP:', value: `${soulData.soulXP}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Your Current Souls:__', value: `*${soulData.souls}*` },
				{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
				{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__**Career Stats**:__', value: '\u200B' },
				{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
				{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
				{ name: '__Your Rank:__', value: `*${soulData.soulXP}*` },
			)
			.setTimestamp()
			.setFooter({ text: 'Powered by Parkie LLC' });
		
		// Fetcher Other Embed
		const fetcherOtherEmbed = new MessageEmbed()
			.setColor('DARK_ORANGE')
			.setTitle(`__**The profile of ${target.username}**__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*Professional Soul Fetcher*')
			.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
			.addFields(
				{ name: 'XP:', value: `${soulData.soulXP}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Current Souls:__', value: `*${soulData.souls}*` },
				{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
				{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__***  Career Stats  ***:__', value: '\u200B' },
				{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
				{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
				{ name: '__Rank:__', value: `*${soulData.soulXP}*` },
			)
			.setTimestamp()
			.setFooter({ text: 'Powered by Parkie LLC' });
		
		// Fetcher Looking At Condemned Embed
		const fetcherCondemnedEmbed = new MessageEmbed()
			.setColor('DARK_RED')
			.setTitle(`__**${target.username}**__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*THE CONDEMNED SOUL*')
			.setThumbnail('https://imgur.com/MXLHd9R.png')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: '__Souls Left__', value: `*${soulData.souls}*` },
				{ name: '__Souls Stolen__', value: `*${soulData.soulsCaught}*` },
				{ name: '\u200B', value: '\u200B' },
				{ name: '__**Condemned Career Stats**__', value: `\u200B` },
				{ name: '__Times as Condemned__', value: `*${soulData.condemnedCount}*` },
				{ name: '__Fetcher Rank__', value: `*${soulData.soulXP}*`, inline: true },
				{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: 'Powered by Parkie LLC' });
		
		// Outputting the Embed
		try {
			if (self) {
				if (userIsCondemned) {
					return condemnedSelfEmbed;
				} else {
					return fetcherSelfEmbed;
				}
			} else if (userIsCondemned) {
				return condemnedOtherEmbed;
			} else if (targetIsCondemned) {
				return fetcherCondemnedEmbed;
			} else {
				return fetcherOtherEmbed;
			}
		} catch (error) {
			console.log(error);
			return errorEmbed;
		}
	},
};