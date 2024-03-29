const profileModelGuild = require ('../models/profileSchemaGuild');

module.exports = {
	getGuildData : async (tempServerId) => {
		try {
			const guildData = await profileModelGuild.findOne({ serverId: tempServerId });
			return guildData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	},
	checkGuildDataExists: async (guildId) => {
		try {
			return await profileModelGuild.exists({ serverId: guildId });
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	},
	getAllGuildsData: async () => {
		try {
			return await profileModelGuild.find({});
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	},
};