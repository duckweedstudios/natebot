const { hauntSomeChannelWithSoul } = require('./hauntings.js');
const { getRandomizedNextTimeInFuture } = require('../functions/time.js');
const { updateAppearancesWith, getMemory } = require('../functions/serverData.js');
const { getWeightedRandomSoulType, getSoulByIdOrDefault } = require('../functions/souls.js');
const dayjs = require('dayjs');
const { getGuildData, getAllGuildsData } = require('../events/guildquery');

module.exports = {
	guildHauntDriver: async (client, guild, fasterFirstHaunting = false, replaceExistingNextOnly = false) => {
		// Given a guild, decide a randomized next time to haunt it,
		// wait to haunt,
		// then haunt it and schedule the next haunting recursively
		const guildIdString = guild.id.toString();
		let guildData;
		try {
			guildData = await getGuildData(guildIdString);
		} catch (err) {
			console.error(`Error in guildHauntDriver: Server data could not be retrieved from the database for guild ${guild.id}: ${err}`);
			// TODO: set this server's status as paused, since no hauntings are occurring due to the error.
			return;
		}
		let nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), guildData.schedule.meanDelay, guildData.schedule.variation);
		console.log(`The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
		// Override the nextTimeObj for a quicker, reliable first appearance if desired
		if (fasterFirstHaunting) {
			const nextAppearance = dayjs().add(1, 'minute');
			nextTimeObj = { nextAppearance, nextAppearanceFormatted: nextAppearance.format('MM/DD/YYYY hh:mm:ss A'), msUntil: Math.abs(dayjs().diff(nextAppearance)) };
			console.log(`Override: The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
		}
		const upcomingSoulType = getWeightedRandomSoulType(guild.id);
		updateAppearancesWith(nextTimeObj, upcomingSoulType, guildIdString, replaceExistingNextOnly);
		// Cancel a next haunting setTimeout if it exists
		if (getMemory(client, guild.id).nextHauntTimeoutId) {
			clearTimeout(client.memory[guild.id].nextHauntTimeoutId);
		}
		module.exports.scheduleHaunting(client, guild, upcomingSoulType, nextTimeObj.msUntil);
	},

	scheduleHaunting: async (client, guild, upcomingSoulType, msUntil) => {
		getMemory(client, guild.id); // Initialize memory if it doesn't exist
		client.memory[guild.id].nextHauntTimeoutId = setTimeout(() => {
			const guildData = getGuildData(guild.id);
			getMemory(client, guild.id).membersWhoFetched = [];
			hauntSomeChannelWithSoul(guild, upcomingSoulType);
			if (!guildData.paused) module.exports.guildHauntDriver(client, guild);
		}, msUntil);
	},

	regenerateMissedHauntings: async (client) => {
		const currentTime = dayjs();
		// Get all guilds from the database
		const guildRecords = await getAllGuildsData();
		// For each guild, check if it has a nextAppearance in the past
		// If so, schedule the next haunting
		for (const guildRecord of guildRecords) {
			let guild = client.guilds.fetch(guildRecord.serverId);
			const nextAppearance = dayjs(guildRecord.schedule.next.time);
			if (nextAppearance.isBefore(currentTime)) {
				// Query for Discord.js guild object by ID
				guild = await guild;
				console.log(`DEBUG: The server ${guild.name} was missed at ${nextAppearance.format('MM/DD/YYYY hh:mm:ss A')}`);
				module.exports.guildHauntDriver(client, guild, false, true);
			} else {
				guild = await guild;
				console.log(`DEBUG: The server ${guild.name} will have haunting regenerated for ${nextAppearance.format('MM/DD/YYYY hh:mm:ss A')}`);
				const upcomingSoulType = getSoulByIdOrDefault(guildRecord.schedule.next.soulTypeId);
				module.exports.scheduleHaunting(client, guild, upcomingSoulType, Math.abs(currentTime.diff(nextAppearance)));
			}
		}
	},
};