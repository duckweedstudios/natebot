const { hauntSomeChannelWithSoul } = require('./hauntings.js');
const { getRandomizedNextTimeInFuture } = require('../functions/time.js');
const { updateAppearancesWith, getMemory } = require('../functions/serverData.js');
const { getWeightedRandomSoulType } = require('../functions/souls.js');
const dayjs = require('dayjs');
const { getGuildData } = require('../events/guildquery');

module.exports = {
	guildHauntDriver: async (client, guild, override = false) => {
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
		if (override) {
			const nextAppearance = dayjs().add(1, 'minute');
			nextTimeObj = { nextAppearance, nextAppearanceFormatted: nextAppearance.format('MM/DD/YYYY hh:mm:ss A'), msUntil: Math.abs(dayjs().diff(nextAppearance)) };
			console.log(`Override: The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
		}
		const upcomingSoulType = getWeightedRandomSoulType(guild.id);
		updateAppearancesWith(nextTimeObj, upcomingSoulType, guildIdString);
		setTimeout(() => {
			getMemory(client, guild.id).membersWhoFetched = [];
			hauntSomeChannelWithSoul(guild, upcomingSoulType);
			if (!guildData.paused) module.exports.guildHauntDriver(client, guild);
		}, nextTimeObj.msUntil);
	},
};