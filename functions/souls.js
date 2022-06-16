const fs = require('fs');
const path = require('path');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
	getDefaultSoul: () => {
		return {
			'id': -1,
			'name': 'Bruh',
			'author': 'OliGuzzler',
			'rarity': 5, // fairly punishing for the condemned if they don't set a soul. TODO this needs revision for the rarity system overhaul
			'emoji': '<:oliguzzler:981560015204798504>',
			'extension': 'mp3',
			'global': true,
		};
	},

	getWeightedRandomSoulType: (guildId) => {
		const soulsFileContents = module.exports.getSoulTypesJSON(guildId);
		if (!soulsFileContents) {
			// No souls exist on the server. Play a default sound.
			return module.exports.getDefaultSoul();
		} else {
			const soulRaritySum = soulsFileContents.souls.reduce((prev, curr) => prev + (1 / curr.rarity), 0);
			const randomNumber = Math.random() * soulRaritySum; // floats on [0, soulRaritySum)
			let runningSum = 0;
			for (const soulType of soulsFileContents.souls) {
				if (randomNumber < (1 / soulType.rarity) + runningSum) {
					return soulType;
				} else {
					runningSum += 1 / soulType.rarity;
				}
			}
			throw new Error(`Error in hauntSomeChannelWithRandomSound: No soul type was chosen. Tried ${randomNumber} of ${soulRaritySum}`);
		}
	},

	getAudioResourceFromSoul: (soulObj, guildId) => {
		try {
			if (soulObj.global) {
				const pathOfFileToPlay = path.join(__dirname, `../resources/global/${soulObj.name}.${soulObj.extension}`);
				return createAudioResource(pathOfFileToPlay, {
					metadata: {
						title: `${soulObj.name} <default sound>`,
					},
				});
			} else {
				const pathOfFileToPlay = path.join(__dirname, `../resources/guilds/${guildId}/${soulObj.name}.${soulObj.extension}`);
				return createAudioResource(pathOfFileToPlay, {
					metadata: {
						title: soulObj.name,
					},
				});
			}
		} catch (err) {
			throw new Error(`Error in getAudioResourceFromSoul: Soul ${soulObj} gave error ${err}`);
		}
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
			// console.log(`Warning in getSoulTypesJSON: No entry for ${guildId}`);
			return false;
		}
	},

	getSoulById: (soulTypeId, guildId) => {
		const soulsFileContents = module.exports.getSoulTypesJSON(guildId);
		if (!soulsFileContents) {
			return -1;
		}

		for (const soulType of soulsFileContents.souls) {
			if (soulType.id === soulTypeId) {
				return soulType;
			}
		}

		console.log(`Warning in getSoulById: Found a non-empty souls file, but did not find a soul with id ${soulTypeId} in server ${guildId}`);
		return false;
	},

	// TODO: revise soul value calculation method
	getSoulValue: (soul) => {
		return soul.rarity;
	},
};