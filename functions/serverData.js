const { getGuildData } = require('../events/guildquery.js');

module.exports = {
	initializeObject: (serverId, condemnedMember, condemnedRoleId, channelId, modRole, meanDelay = 1440, variation = 5) => {
		return {
			serverId,
			condemnedMember,
			newSoulMade: false,
			settings: {
				paused: false,
				condemnedRoleId,
				channelId,
				modRole,
			},
			schedule: {
				next: {
					time: null,
					soulTypeId: null,
				},
				past: {
					time: null,
					soulTypeId: null,
				},
				meanDelay,
				variation,
			},
			stats: {
				serverSoulsCaught: 0,
				hauntingsCount: 0,
				soulsCreated: 0,
				lastCondemnedMember: 0,
			},
		};
	},

	getMemory: (client, guildIdString) => {
		try {
			return client.memory[guildIdString];
		} catch (err) {
			client.memory = {
				...client.memory,
				[guildIdString]: {
					membersWhoFetched: [],
					lastSummonTime: null,
				},
			};
			return client.memory[guildIdString];
		}
	},

	updateAppearancesWith: async (dayjsObj, soulType, guildIdString, nextBecomesPast = true) => {
		try {
			const guildData = await getGuildData(guildIdString);
			if (nextBecomesPast) guildData.schedule.past = guildData.schedule.next;
			guildData.schedule.next.time = dayjsObj.nextAppearance.toDate();
			guildData.schedule.next.soulTypeId = soulType.id;
			guildData.save();
		} catch (err) {
			console.error(`Error in replaceEarlierAppearance: Could not update information in database for server ${guildIdString}: ${err}`);
		}
	},
};