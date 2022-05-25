const { joinBruhTest } = require('./hauntings.js');

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
        trueGuild = await guild.fetch();
        joinBruhTest(trueGuild);
    }
}

module.exports = {
    beginIntervalTest: (client, timeInMs) => {
        setInterval(() => hauntTestAllActiveServers(client), timeInMs);
    }
}