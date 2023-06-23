const profileModel = require ('../models/profileSchema');
const profileModelGuild = require ('../models/profileSchemaGuild');

module.exports = {
	name: 'set',
	setValue : async (interaction, id, datapoint, value) => {
		try {
			await profileModel.findOneAndUpdate({ fetcherID: id }, {
				$set: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
	settingsAvailable: {
		'paused': 'boolean',
		'condemnedRoleId': 'string',
		'meanDelay': 'number',
		'variation': 'number',
	},
	setServerSetting: async (guildId, setting, newValue) => {
		if (setting in module.exports.settingsAvailable && typeof newValue === module.exports.settingsAvailable[setting]) {
			try {
				if (setting === 'meanDelay' || setting === 'variation') {
					await profileModelGuild.findOneAndUpdate({ serverId: guildId }, {
						$set: {
							[`schedule.${setting}`]: newValue,
						},
					});
				} else {
					await profileModelGuild.findOneAndUpdate({ serverId: guildId }, {
						$set: {
							[setting]: newValue,
						},
					});
				}
			} catch (err) {
				console.error(err);
				throw new Error(`Error with database query in set.js: ${err}`);
			}
		} else {
			throw new Error(`Error in set.js: invalid setting or type for setting: ${setting} = ${newValue}`);
		}
	},
	getServerSettings(guildId) {
		try {
			return profileModelGuild.findOne({ serverId: guildId });
		} catch (err) {
			console.error(err);
			throw new Error(`Error with database query in set.js: ${err}`);
		}
	},
};