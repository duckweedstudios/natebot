const { getServerDataFromMemory } = require('./serverData.js');
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

	// Deprecated warning: checks for data in memory rather than database
	isMemberCondemnedSoul: (member, client, guild) => {
		const serverDataObject = getServerDataFromMemory(client, guild.id.toString());
		if (serverDataObject === null) throw new Error(`Error in isMemberCondemned: Server data object does not exist in memory: key ${guild.id.toString()} in data:\n${client.nateBotData}`);
		return member.user.id === serverDataObject.condemnedSoul;
	},
};