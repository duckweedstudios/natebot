const { MessageEmbed } = require('discord.js');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');
const { getSoulTier } = require('../functions/tiers');

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
	
		let soulTierData;
		try {
			soulTierData = getSoulTier(soulData.soulXP);
		} catch (err) {
			console.error('Error in getEmbed.js: Could not get soul tier data (eg fetcher tier): ' + err);
			return;
		}
		
		// Outputting the Embed
		try {
			if (self) {
				if (userIsCondemned) {
					// Condemned Self Embed
					return new MessageEmbed()
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
				} else {
					// Fetcher Self Embed
					return new MessageEmbed()
						.setColor('RED')
						.setTitle(`__**Your Profile**__`)
						.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
						.setDescription(`*${soulTierData.tierName} Soul Fetcher*`)
						.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
						.addFields(
							{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
							// { name: '\u200B', value: '\u200B' },
							{ name: '__Your Current Souls:__', value: `*${soulData.souls}*` },
							{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
							{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
							{ name: '\u200B', value: '\u200B' },
							{ name: '__***       Career Stats       ***__', value: '\u200B' }, // don't know why just putting a space breaks this
							{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
							{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
						)
						.setTimestamp()
						.setFooter({ text: 'Powered by Parkie LLC' });
				}
			} else if (userIsCondemned) {
				// Condemned Other Embed
				return new MessageEmbed()
					.setColor('DARK_ORANGE')
					.setTitle(`__**${target.username}'s profile**__`)
					.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName} Soul Fetcher*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
						{ name: '\u200B', value: '\u200B' },
						{ name: '__Current Souls:__', value: `*${soulData.souls}*` },
						{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
						{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
						{ name: '\u200B', value: '\u200B' },
						{ name: '__***       Career Stats       ***__', value: '\u200B' },
						{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
						{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Powered by Parkie LLC' });
			} else if (targetIsCondemned) {
				// Fetcher Looking At Condemned Embed
				return new MessageEmbed()
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
						{ name: '__Fetcher Rank__', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)`, inline: true },
						{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Powered by Parkie LLC' });
			} else {
				// Fetcher Other Embed
				return new MessageEmbed()
					.setColor('DARK_ORANGE')
					.setTitle(`__**The profile of ${target.username}**__`)
					.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName} Soul Fetcher*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
						// { name: '\u200B', value: '\u200B' },
						{ name: '__Current Souls:__', value: `*${soulData.souls}*` },
						{ name: '__Souls Caught:__', value: `*${soulData.soulsCaught}*`, inline: true },
						{ name: '__Fetch Count:__', value: `*${soulData.fetchCount}*`, inline: true },
						{ name: '\u200B', value: '\u200B' },
						{ name: '__***       Career Stats       ***__', value: '\u200B' },
						{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
						{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Powered by Parkie LLC' });
			}
		} catch (error) {
			console.log(error);
			// Error Embed
			return new MessageEmbed()
				.setColor('BLUE')
				.setTitle(`__***EMBED ERROR***__`)
				.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
				.setDescription('*There was an error when producing this embed*')
				.setThumbnail('https://i.imgur.com/T9HDICa.jpeg')
				.setTimestamp();
		}
	},
};