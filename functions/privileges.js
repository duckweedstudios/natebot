const { getGuildData } = require('../events/guildquery.js');

module.exports = {
	// Returns true iff the user is the owner or has the mod role for the bot
	isMemberPrivileged: async (member, client, guild) => {
		let guildData;
		try {
			guildData = await getGuildData(guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			console.error(`Error in isMemberPrivileged: Server data could not be retrieved from the database for guild ${guild.id}: ${err}`);
			return;
		}
		return module.exports.isMemberOwner(member, guild) || member.roles.cache.hasAny((await guild.roles.fetch(guildData.settings.condemnedRoleId)));
	},

	isMemberDev: (userId) => {
		return userId === 177512311462821888 || userId === 186517957210406912;
	},

	isMemberOwner: (member, guild) => {
		return member.user.id === guild.ownerId;
	},

	isMemberCondemnedSoul: async (member, guild) => {
		let guildData;
		try {
			guildData = await getGuildData(guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			throw new Error(`Error in /pause: Server data could not be retrieved from the database for guild ${guild.id}: ${err}`);
		}
		return module.exports.isMemberCondemnedSoulWithGuildQuery(member, guildData);
	},

	// Passing in the result of getGuildData, returns true iff the member is condemned
	// This reduces redundant queries for optimization purposes
	isMemberCondemnedSoulWithGuildQuery: (member, guildData) => {
		return member.user.id === guildData.condemnedMember;
	},
};