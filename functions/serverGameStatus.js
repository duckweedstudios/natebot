/*
A JSON object containing all the information we need about a server could be as follows:
{
    condemnedMember: <null | user ID>, // must be tracked in case condemned roles are manually assigned by server admins, which is not desired
    modRoles: [<role that can use bot's admin commands>],
    paused: <boolean>,
    setup: <boolean, iff setup command has been used>,
    schedule: {
        nextAppearance: <Date>,
        meanDelay: <avg minutes after appearance before the next as decimal number>,
        variation: <affects how much appearance times can vary from mean>,
    },

}

Then, using the server's ID, we can retrieve other information, such as its:
 - Sound effects, categorized in /resources/<server id>/
 - ???

*/

module.exports = {
    getStatus: async (guild) => {
        // TODO: Get the information needed from the database

        // TODO: Return an object with that information
        return {
            condemnedMember: null,
            modRoles: [],
            paused: false,
            setup: false,
            schedule: {
                nextAppearance: null,
                meanDelay: -1,
                variation: -1,
            },
        }
    },

    getStatusAsString: async (guild) => {
        const obj = await getStatus(guild);
        let result = `Server status for ${servername}:\n`;
        if (!obj.setup) {
            result += 'This server has not been setup for the bot yet! Use /setup first.';
            return result;
        }
        result += `Temporal actions (such as hauntings, soul decay) are ${obj.paused ? 'paused' : 'active'}.\n`;
        result += `The next haunting is expected around ${obj.schedule.nextAppearance}. The mean haunting delay is ${obj.schedule.meanDelay} minutes and the variation setting is ${obj.schedule.variation}.\n`;
        result += `This server is ${obj.condemnedMember ? 'being haunted by ' + obj.condemnedMember : 'not currently haunted, somehow. Use /makecondemned to fix'}.\n`;
        if (obj.modRoles.length > 0) {
            result += `The roles which can interact with the bot's admin commands are: `;
            // TODO: iterate over them and print the text of the role, not the @
            result += `.\n`;
        } else {
            result += `The server owner is the only one allowed to use the bot's admin commands now.\n`;
        }
        return result;
    }
}