// const dayjs = require('dayjs');

module.exports = {
	initializeObject: (condemnedMember, condemnedRoleId, hellspeakChannelId, modRoles, meanDelay = 1440, variation = 5) => {
		return {
			condemnedMember,
			condemnedRoleId,
			hellspeakChannelId,
			modRoles,
			paused: false,
			setup: true,
			schedule: {
				nextAppearance: {
					time: null,
					soulType: null,
				},
				pastAppearance: {
					time: null,
					soulType: null,
				},
				meanDelay,
				variation,
			},
		};
	},

	getServerDataFromMemory: (client, guildIdString) => {
		if (client.nateBotData === null) {
			return null;
		}
		if (guildIdString in client.nateBotData) {
			return client.nateBotData[guildIdString];
		} else {
			return null;
		}
	},

	updateAppearancesWith: (dayjsObj, soulType, client, guildIdString) => {
		const serverDataObject = module.exports.getServerDataFromMemory(client, guildIdString);
		if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guildIdString} in data:\n${client.nateBotData}`);
		client.nateBotData[guildIdString].schedule = { ...serverDataObject.schedule, next: { when: dayjsObj, soulType }, past: serverDataObject.schedule.next };
		// console.log(`next is ${JSON.stringify(serverDataObject.schedule.next)}, past is ${JSON.stringify(serverDataObject.schedule.past)}`);
		// console.log(client.nateBotData['672609929495969813'].schedule);
	},
};