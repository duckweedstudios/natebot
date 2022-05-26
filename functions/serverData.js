const dayjs = require('dayjs');

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
        }
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
        let serverDataObject = module.exports.getServerDataFromMemory(client, guildIdString);
        if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guildIdString} in data:\n${client.nateBotData}`);
        client.nateBotData[guildIdString].schedule = { ...serverDataObject, nextAppearance: dayjsObj, pastAppearance: serverDataObject.nextAppearance};
        console.log(client.nateBotData);
    },

    isMemberPrivileged: (member, client, guild) => {
        let serverDataObject = module.exports.getServerDataFromMemory(client, guild.id.toString());
        if (serverDataObject === null) throw new Error(`Error in replaceEarlierAppearance: Server data object does not exist in memory: key ${guild.id.toString()} in data:\n${client.nateBotData}`);
        return member.user.id === guild.ownerId || member.roles.cache.hasAny(serverDataObject.modRoles);
    }
}