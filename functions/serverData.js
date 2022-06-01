// const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

module.exports = {
	initializeObject: (condemnedMember, modRoles, meanDelay = 1440, variation = 5) => {
		return {
			condemnedMember,
			modRoles,
			paused: false,
			setup: true,
			schedule: {
				nextAppearance: null,
				pastAppearance: null,
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

	updateAppearancesWith: (dayjsObj, client, guildIdString) => {
		const serverDataObject = module.exports.getServerDataFromMemory(client, guildIdString);
		if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guildIdString} in data:\n${client.nateBotData}`);
		client.nateBotData[guildIdString].schedule = { ...serverDataObject, nextAppearance: dayjsObj, pastAppearance: serverDataObject.nextAppearance };
		console.log(client.nateBotData);
	},

	// Returns the souls.json object for that server if it exists and isn't empty, otherwise returns false. Argument can be string or number.
	getSoulTypesJSON: (guildId) => {
		try {
			const soulsFilePath = path.join(__dirname, `../resources/guilds/${guildId}/souls.json`);
			const soulsFileContents = JSON.parse(fs.readFileSync(soulsFilePath));
			if (soulsFileContents.souls.length === 0) {
				return false;
			} else {
				return soulsFileContents;
			}
		} catch (err) {
			console.log(`Warning in getSoulTypesJSON: No entry for ${guildId}`);
			return false;
		}
	},
};