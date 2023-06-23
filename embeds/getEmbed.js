const { MessageEmbed } = require('discord.js');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');
const { getSoulTier } = require('../functions/tiers');

module.exports = {
	getEmbed : async (interaction, member) => {
		const guild = interaction.guild;
		let self = false;
		let targetIsCondemned = false;
		let userIsCondemned = false;
		let soulData;
		let guildData;
		
		// Getting Guild Data
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

		// Determinations
		if (member.id === interaction.member) { self = true; }
		if (guildData.condemnedMember === member.id) { targetIsCondemned = true; }
		if (guildData.condemnedMember === interaction.user.id) { userIsCondemned = true; }
		
		// Getting target user data
		try {
			soulData = await getSoulData(interaction, member.id);
			if (!soulData) {
				if (self) {
					interaction.reply({ content:'You have not joined the soul fetchers, use /join to get started!', ephemeral: true });
					return;
				} else {
					interaction.reply({ content:'This user has not joined the soul fetchers', ephemeral: true });
					return;
				}
			}
		} catch (err) {
			interaction.reply({ content: err, ephemeral: true });
			return;
		}

	
		let soulTierData;
		try {
			soulTierData = getSoulTier(soulData.soulXP);
		} catch (err) {
			console.error('Error in getEmbed.js: Could not get soul tier data (eg fetcher tier): ' + err);
			return;
		}
		const target = member.user;
		// Outputting the Embed
		try {
			if (self) {
				if (userIsCondemned) {
					// Condemned Self Embed
					return new MessageEmbed()
						.setColor('DARK_RED')
						.setTitle(`__**🔥 ${target.username.toUpperCase()} 🔥**__`)
						.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
						.setDescription('**👹 T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓ 👹**')
						.setThumbnail('https://imgur.com/MXLHd9R.png')
						.addFields(
							{ name: '---------------------------------', value: ' ' },
							{ name: '__Your Souls Left__', value: `*👻  ${soulData.souls}*` },
							{ name: '__Spent Souls__', value: `*💀  ${(100 - soulData.soulsCaught - soulData.souls)}*`, inline: true },
							{ name: '__Souls Stolen__', value: `🪝  *${soulData.soulsCaught}*`, inline: true },
							{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
							{ name: '__Times as Condemned__', value: `*${soulData.condemnedCount}*` },
							{ name: '__Fetcher Rank__', value: `*${soulData.soulXP}*`, inline: true },
							{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
						)
						.setTimestamp()
						.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
				} else {
					// Fetcher Self Embed
					return new MessageEmbed()
						.setColor('RED')
						.setTitle(`__**Your Profile**__`)
						.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
						.setDescription(`*${soulTierData.tierName}*`)
						.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
						.addFields(
							{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
							{ name: '---------------------------------', value: ' ' },
							{ name: '__Your Current Souls:__', value: `👻  *${soulData.souls}*` },
							{ name: '__Souls Caught:__', value: `🎣  *${soulData.soulsCaught}*`, inline: true },
							{ name: '__Fetch Count:__', value: `*🪝  ${soulData.fetchCount}*`, inline: true },
							{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
							{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
							{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
						)
						.setTimestamp()
						.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
				}
			} else if (userIsCondemned) {
				// Condemned Looking at Other Embed
				return new MessageEmbed()
					.setColor('DARK_ORANGE')
					.setTitle(`__**${target.username}'s profile**__`)
					.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName}*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
						{ name: '---------------------------------', value: ' ' },
						{ name: '__Current Souls:__', value: `👻  *${soulData.souls}*` },
						{ name: '__Souls Caught:__', value: `🎣  *${soulData.soulsCaught}*`, inline: true },
						{ name: '__Fetch Count:__', value: `*🪝  ${soulData.fetchCount}*`, inline: true },
						{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
						{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
						{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
			} else if (targetIsCondemned) {
				// Fetcher Looking at Condemned Embed
				return new MessageEmbed()
					.setColor('DARK_RED')
					.setTitle(`__**🔥 ${target.username.toUpperCase()} 🔥**__`)
					.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
					.setDescription('**👹 T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓ 👹**')
					.setThumbnail('https://imgur.com/MXLHd9R.png')
					.addFields(
						{ name: '---------------------------------', value: ' ' },
						{ name: '__Souls Left__', value: `👻  *${soulData.souls}*`, inline: true },
						{ name: '__Souls Stolen__', value: `*🪝  ${soulData.soulsCaught}*`, inline: true },
						{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
						{ name: '__Times as Condemned__', value: `*${soulData.condemnedCount}*` },
						{ name: '__Fetcher Rank__', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)`, inline: true },
						{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
			} else {
				// Fetcher Looking at Other Embed
				return new MessageEmbed()
					.setColor('DARK_ORANGE')
					.setTitle(`__**The profile of ${target.username}**__`)
					.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName}*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.tierNum}** (${soulData.soulXP} XP)` },
						{ name: '---------------------------------', value: ' ' },
						{ name: '__Current Souls:__', value: `👻  *${soulData.souls}*` },
						{ name: '__Souls Caught:__', value: `🎣  *${soulData.soulsCaught}*`, inline: true },
						{ name: '__Fetch Count:__', value: `*🪝  ${soulData.fetchCount}*`, inline: true },
						{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
						{ name: '__Times as Condemned:__', value: `*${soulData.condemnedCount}*`, inline: true },
						{ name: '__Was Fooled Count:__', value: `*${soulData.gotFooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
			}
		} catch (error) {
			console.log(error);
			// Error Embed
			return new MessageEmbed()
				.setColor('BLUE')
				.setTitle(`__***EMBED ERROR***__`)
				.setAuthor({ name: target.username, iconURL: target.displayAvatarURL({ dynamic: true }) })
				.setDescription('*There was an error when producing this embed*')
				.setThumbnail('https://i.imgur.com/T9HDICa.jpeg')
				.setTimestamp();
		}
	},
};