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
    }
}