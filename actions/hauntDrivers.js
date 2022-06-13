const { joinBruhTest, hauntSomeChannelWithSoul } = require('./hauntings.js');
const { getRandomizedNextTimeInFuture } = require('../functions/time.js');
const { getServerDataFromMemory, updateAppearancesWith } = require('../functions/serverData.js');
const { getWeightedRandomSoulType } = require('../functions/souls.js');
const dayjs = require('dayjs');
const { getGuildData } = require('../events/guildquery');

const hauntTestAllActiveServers = async (client, guilds) => {
	console.log(guilds);
	if (!guilds) {
		guilds = await client.guilds.fetch();
	}
	console.log(guilds);
	for (const guild of guilds.values()) {
		// guild is an OAuth2Guild, not a true guild, per the d.js client.guilds.fetch() implementation
		// it exposes the .fetch() method once more to get the full guild, which we need.
		// since we need to await that call, we must use a for-of loop rather than forEach
		// (at least I think this is the case)
		// and yes, this will work even if servers are added during bot execution
		const trueGuild = await guild.fetch();
		joinBruhTest(trueGuild);
	}
};

module.exports = {
	beginIntervalTest: (client, timeInMs) => {
		setInterval(() => hauntTestAllActiveServers(client), timeInMs);
	},

	beginScheduledTest: async (client, guilds) => {
		if (!guilds) {
			guilds = await client.guilds.fetch();
		}
		for (const guild of guilds.values()) {
			const trueGuild = await guild.fetch();
			const nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), 0, 0.05);
			console.log(`The server ${trueGuild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
			console.log(nextTimeObj.msUntil);
			setTimeout(() => {
				joinBruhTest(trueGuild);
			}, nextTimeObj.msUntil);
		}
	},

	beginRepeatingTest: async (client, guilds) => {
		if (!guilds) {
			guilds = await client.guilds.fetch();
		}
		for (const guild of guilds.values()) {
			const trueGuild = await guild.fetch();
			module.exports.guildHauntDriverMemory(client, trueGuild);
		}
	},

	guildHauntDriverMemory: (client, guild) => {
		const guildIdString = guild.id.toString();
		const serverDataObject = getServerDataFromMemory(client, guildIdString);
		if (serverDataObject === null) throw new Error(`Error in guildHauntDriver: Server data object does not exist in memory: key ${guildIdString} in data:\n${client.nateBotData}`);
		const nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), -5, 0.05/* serverDataObject.schedule.meanDelay, serverDataObject.schedule.variation*/);
		console.log(`The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
		const upcomingSoulType = getWeightedRandomSoulType(guild.id);
		updateAppearancesWith(nextTimeObj, upcomingSoulType, client, guildIdString);
		setTimeout(() => {
			hauntSomeChannelWithSoul(guild, upcomingSoulType);
			if (!serverDataObject.paused) module.exports.guildHauntDriverMemory(client, guild);
		}, nextTimeObj.msUntil);
	},

	guildHauntDriver: async (client, guild) => {
		const guildIdString = guild.id.toString();
		let guildData;
		try {
			guildData = await getGuildData(guildIdString);
		} catch (err) {
			console.error(`Error in guildHauntDriver: Server data could not be retrieved from the database for guild ${guild.id}: ${err}`);
			// TODO: set this server's status as paused, since no hauntings are occurring due to the error.
			return;
		}
		const nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), -5, 0.05/* serverDataObject.schedule.meanDelay, serverDataObject.schedule.variation*/);
		console.log(`The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
		const upcomingSoulType = getWeightedRandomSoulType(guild.id);
		updateAppearancesWith(nextTimeObj, upcomingSoulType, guildIdString);
		setTimeout(() => {
			hauntSomeChannelWithSoul(guild, upcomingSoulType);
			if (!guildData.paused) module.exports.guildHauntDriver(client, guild);
		}, nextTimeObj.msUntil);
	},
};