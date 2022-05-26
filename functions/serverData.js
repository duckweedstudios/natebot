module.exports = {
    initializeObject: (condemnedMember, modRoles, meanDelay = 1440, variation = 5) => {
        return {
            condemnedMember,
            modRoles,
            paused: false,
            setup: true,
            schedule: {
                nextAppearance: null,
                nextAppearanceTemp: null,
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
    }
}