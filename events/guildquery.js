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
			console.log(`checking for Guild ${guildId}`);
			const GuildExists = await profileModelGuild.exists({ serverId: guildId });
			console.log(GuildExists);
			return GuildExists;
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