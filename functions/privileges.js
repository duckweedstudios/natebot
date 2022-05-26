module.exports = {
    isMemberPrivileged: (member, client, guild) => {
        let serverDataObject = module.exports.getServerDataFromMemory(client, guild.id.toString());
        if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guild.id.toString()} in data:\n${client.nateBotData}`);
        return member.user.id === guild.ownerId || member.roles.cache.hasAny(serverDataObject.modRoles);
    },

    isMemberDev: (userId) => {
        return userId === 177512311462821888 || userId === 186517957210406912;
    }
}