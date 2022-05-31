const { getServerDataFromMemory } = require('./serverData.js');

module.exports = {
	isMemberPrivileged: (member, client, guild) => {
		const serverDataObject = getServerDataFromMemory(client, guild.id.toString());
		if (serverDataObject === null) throw new Error(`Error in isMemberPrivileged: Server data object does not exist in memory: key ${guild.id.toString()} in data:\n${client.nateBotData}`);
		console.log(module.exports.isMemberOwner(member, guild));
		return module.exports.isMemberOwner(member, guild) || member.roles.cache.hasAny(serverDataObject.modRoles);
	},

	isMemberDev: (userId) => {
		return userId === 177512311462821888 || userId === 186517957210406912;
	},

	isMemberOwner: (member, guild) => {
		return member.user.id === guild.ownerId;
	},

	isMemberCondemnedSoul: (member, client, guild) => {
		const serverDataObject = getServerDataFromMemory(client, guild.id.toString());
		if (serverDataObject === null) throw new Error(`Error in isMemberCondemned: Server data object does not exist in memory: key ${guild.id.toString()} in data:\n${client.nateBotData}`);
		return member.user.id === serverDataObject.condemnedSoul;
	},
};