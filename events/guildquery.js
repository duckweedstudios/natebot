const profileModelGuild = require ('../models/profileSchemaGuild');

module.exports = {
	getGuildData : async (tempServerId) => {
		try {
			const guildData = await profileModelGuild.findOne({ serverID: tempServerId });
			return guildData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	},
	checkGuildDataExists: async (guildId) => {
		try {
			return profileModelGuild.exists({ serverID: guildId });
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	},
};