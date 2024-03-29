const { MessageEmbed } = require('discord.js');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');
const { getSoulTier } = require('../functions/tiers');
const profileModel = require ('../models/profileSchema');
const { getMemory } = require('../functions/serverData');
const dayjs = require('dayjs');

module.exports = {
	// User Profile Embed Creation
	getUserEmbed : async (interaction, target) => {
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
		if (target.id === interaction.member.id) { self = true; }
		if (guildData.condemnedMember === target.id) { targetIsCondemned = true; }
		if (guildData.condemnedMember === interaction.user.id) { userIsCondemned = true; }
		
		// Getting target user data
		try {
			soulData = await getSoulData(interaction, target.id);
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
		const targetUser = target.user;
		// Outputting the Embed
		try {
			if (self) {
				if (userIsCondemned) {
					// Condemned Self Embed
					return new MessageEmbed()
						.setColor('DARK_RED')
						.setTitle(`__**🔥 ${targetUser.username.toUpperCase()} 🔥**__`)
						.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
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
						.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
						.setDescription(`*${soulTierData.tierName}*`)
						.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
						.addFields(
							{ name: 'Rank:', value: `**${soulTierData.level}** (${soulData.soulXP} XP)` },
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
					.setTitle(`__**${targetUser.username}'s profile**__`)
					.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName}*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.level}** (${soulData.soulXP} XP)` },
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
					.setTitle(`__**🔥 ${targetUser.username.toUpperCase()} 🔥**__`)
					.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
					.setDescription('**👹 T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓ 👹**')
					.setThumbnail('https://imgur.com/MXLHd9R.png')
					.addFields(
						{ name: '---------------------------------', value: ' ' },
						{ name: '__Souls Left__', value: `👻  *${soulData.souls}*`, inline: true },
						{ name: '__Souls Stolen__', value: `*🪝  ${soulData.soulsCaught}*`, inline: true },
						{ name: '---------------------------------', value: '__***Career Stats 📊***__' },
						{ name: '__Times as Condemned__', value: `*${soulData.condemnedCount}*` },
						{ name: '__Fetcher Rank__', value: `**${soulTierData.level}** (${soulData.soulXP} XP)`, inline: true },
						{ name: '__Fooled Count__', value: `*${soulData.fooledCount}*`, inline: true },
					)
					.setTimestamp()
					.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
			} else {
				// Fetcher Looking at Other Embed
				return new MessageEmbed()
					.setColor('DARK_ORANGE')
					.setTitle(`__**The profile of ${targetUser.username}**__`)
					.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
					.setDescription(`*${soulTierData.tierName}*`)
					.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
					.addFields(
						{ name: 'Rank:', value: `**${soulTierData.level}** (${soulData.soulXP} XP)` },
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
				.setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
				.setDescription('*There was an error when producing this embed*')
				.setThumbnail('https://i.imgur.com/T9HDICa.jpeg')
				.setTimestamp();
		}
	},
	// Help Embed Creation
	getHelpEmbed : async (interaction) => {
		return new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`__***FAQ***__`)
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setDescription('*Welcome to the Condemned Souls Bot!*')
			.setThumbnail('https://i.imgur.com/qbCKk3C.jpg')
			.addFields(
				{ name: 'What is it?', value: `The Condemned Souls bot is an economy/engagement JavaScript game that "haunts" voice channels. Each time it haunts, a sound effect is played and users can "fetch" the soul for points.` },
				{ name: '---------------------------------', value: ' ' },
				{ name: 'How do I play?', value: `First you use the /join command to become a soul fetcher. Once you join, you can use /souls to interact with the bot and see your profile and stats! When a haunting occurs, use the /fetch command to catch the soul and gain points!` },
				{ name: '---------------------------------', value: ' ' },
				{ name: 'What is T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓?', value: `Each server has a user who is T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓ . This user has admin-like privileges and can change nicknames, mute server members, and play sound effects in exchange for their souls.` },
				{ name: '---------------------------------', value: ' ' },
				{ name: 'How do I win?', value: `Souls such as yours exist in eternal torment (AKA There is no winning). However, once a fetcher has collected more souls than T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓ , they can use the Claim button on T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓  users profile to replace them and gain admin privileges.` },
				{ name: '---------------------------------', value: ' ' },
				{ name: 'How does this work?', value: `If you want to learn more about how this bot works, contact our developers through our Discord Server!` })
			.setTimestamp()
			.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });

	},
	// Server Stats Embed Creation
	getServerStatsEmbed : async (interaction) => {
		const guildData = await getGuildData(interaction.guild.id);
		const condemnedData = await getSoulData(interaction, guildData.condemnedMember);
		const allFetchersDataOne = await profileModel.find({ serverId: interaction.guild.id }).sort({ souls: -1, soulsCaught: -1 });
		const allFetchersData = [];
		for (const i in allFetchersDataOne) {
			if (allFetchersDataOne[i].fetcherId !== condemnedData.fetcherId) {
				allFetchersData.push(allFetchersDataOne[i]);
			}
		}
		let nextAppearanceBounds;
		try {
			nextAppearanceBounds = getMemory(interaction.client, interaction.guild.id).nextAppearanceBounds;
		} catch (err) {
			nextAppearanceBounds = '???';
		}
		const pastTime = guildData.schedule.past.time ? dayjs(guildData.schedule.past.time).format('MM/DD/YYYY h:mm A') : 'None yet...';
		
		const serverEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle(`__***${interaction.guild.name}'s Stats***__`)
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields(
				{ name: '__**T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓**__', value: `👹 **${condemnedData.fetcherTag}** 👹` },
			)
			.addFields(
				{ name: '---------------------------------', value: ' ' },
				{ name: 'Next Appearance ⏭️', value: `Between ${nextAppearanceBounds}` },
				{ name: 'Last Appearance ⏮️', value: `*${pastTime}*` },
				{ name: '---------------------------------', value: ' ' });
		
		try {
			serverEmbed.addFields({ name: '__**Top Fetchers 📊**__', value: `__**#1 - ${allFetchersData[0].fetcherTag}:**__ ${allFetchersData[0].souls} souls\n__**#2 - ${allFetchersData[1].fetcherTag}:**__ ${allFetchersData[1].souls} souls\n__**#3 - ${allFetchersData[2].fetcherTag}:**__ ${allFetchersData[2].souls} souls` });
		} catch (error) {
			serverEmbed.addFields({ name: '__**Top Fetchers 📊**__', value: 'Not Enough Fetchers' });
		}
		serverEmbed.setImage('https://i.imgur.com/bJDpP4T.jpeg');
		serverEmbed.setTimestamp();
		serverEmbed.setFooter({ text: 'Developed by Zade Dohan and Corey Briscoe' });
		return serverEmbed;
	},
};