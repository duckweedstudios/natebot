const { joinBruhTest } = require('./hauntings.js');
const { getRandomizedNextTimeInFuture } = require('../functions/time.js');
const dayjs = require('dayjs');

const hauntTestAllActiveServers = async (client, guilds) => {
    console.log(guilds);
    if (!guilds) {
        guilds = await client.guilds.fetch();
    }
    console.log(guilds);
    for (let guild of guilds.values()) {
        // guild is an OAuth2Guild, not a true guild, per the d.js client.guilds.fetch() implementation
        // it exposes the .fetch() method once more to get the full guild, which we need.
        // since we need to await that call, we must use a for-of loop rather than forEach 
        // (at least I think this is the case)
        // and yes, this will work even if servers are added during bot execution
        let trueGuild = await guild.fetch();
        joinBruhTest(trueGuild);
    }
}

const hauntGuildAndScheduleNext = (guild) => {
    let nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), -5, .05);
    console.log(`The server ${guild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
    // TODO: check if server has it paused before performing
    setTimeout(() => {
        joinBruhTest(guild);
        hauntGuildAndScheduleNext(guild);
    }, nextTimeObj.msUntil);
}

module.exports = {
    beginIntervalTest: (client, timeInMs) => {
        setInterval(() => hauntTestAllActiveServers(client), timeInMs);
    },

    beginScheduledTest: async (client, guilds) => {
        if (!guilds) {
            guilds = await client.guilds.fetch();
        }
        for (let guild of guilds.values()) {
            let trueGuild = await guild.fetch();
            let nextTimeObj = getRandomizedNextTimeInFuture(dayjs(), 0, .05);
            console.log(`The server ${trueGuild.name} will be haunted at ${nextTimeObj.nextAppearanceFormatted}`);
            console.log(nextTimeObj.msUntil);
            setTimeout(() => {
                joinBruhTest(trueGuild);
            }, nextTimeObj.msUntil);
        }
    },

    beginRepeatingTest: async (client, guilds) => {
        if (!guilds) {
            guilds = await client.guilds.fetch();
        }
        for (let guild of guilds.values()) {
            let trueGuild = await guild.fetch();
            hauntGuildAndScheduleNext(trueGuild);
        }
    },
}