// const dayjs = require('dayjs');

const { getGuildData } = require('../events/guildquery.js');
// const profileModelGuild = require('../models/profileSchemaGuild.js');

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
			return client.nateBotData[guildIdString];
		} catch (err) {
			client.nateBotData = {
				...client.nateBotData,
				[guildIdString]: {
					membersWhoFetched: [],
					lastSummonTime: null,
				},
			};
			return client.nateBotData[guildIdString];
		}
	},

	updateAppearancesWithMemory: (dayjsObj, soulType, client, guildIdString) => {
		const serverDataObject = module.exports.getServerDataFromMemory(client, guildIdString);
		if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guildIdString} in data:\n${client.nateBotData}`);
		client.nateBotData[guildIdString].schedule = { ...serverDataObject.schedule, next: { when: dayjsObj, soulType }, past: serverDataObject.schedule.next };
		// console.log(`next is ${JSON.stringify(serverDataObject.schedule.next)}, past is ${JSON.stringify(serverDataObject.schedule.past)}`);
		// console.log(client.nateBotData['672609929495969813'].schedule);
	},

	updateAppearancesWith: async (dayjsObj, soulType, guildIdString) => {
		try {
			const guildData = await getGuildData(guildIdString);
			guildData.schedule.past = guildData.schedule.next;
			guildData.schedule.next.time = dayjsObj.nextAppearance.toDate();
			guildData.schedule.next.soulTypeId = soulType.id;
			guildData.save();
		} catch (err) {
			console.error(`Error in replaceEarlierAppearance: Could not update information in database for server ${guildIdString}: ${err}`);
		}
	},
};