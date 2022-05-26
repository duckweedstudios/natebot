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

    getServerDataFromMemory: (client, guild) => {
        if (client.nateBotData === null) { 
            return null;
        }
        if (guild.id.toString() in client.nateBotData) {
            return client.nateBotData[guild.id.toString()];
        } else {
            return null;
        }
    }
}