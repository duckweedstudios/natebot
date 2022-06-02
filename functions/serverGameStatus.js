/*
A JSON object containing all the information we need about a server could be as follows:
{
    condemnedMember: <id>, // default null
    modRoles: [<id>], // unused for now. roles that can use bot's admin commands
    paused: <boolean>, // default false
    setup: <boolean>, // default false
    schedule: {
        next: {
			when: { // default null
				time: <DayJS object OR String>, // Appears as "2022-06-02T13:22:22.465Z", and this string can construct dayjs objects
				timeFormatted: <String>, // Appears as 06/02/2022 09:22:22 AM
				msUntil: <integer>,
			},
			soulType: { // default null
				name: <String>,
				author: <id>,
				rarity: <integer>,
				emoji: <String>,
				extension: <String>,
			},
		},
        past: {
			when: { // default null
				time: <DayJS object OR String>, // Appears as "2022-06-02T13:22:22.465Z", and this string can construct dayjs objects
				timeFormatted: <String>, // Appears as 06/02/2022 09:22:22 AM
				msUntil: <integer>,
			},
			soulType: { // default null
				name: <String>,
				author: <id>,
				rarity: <integer>,
				emoji: <String>,
				extension: <String>,
			},
		},
        meanDelay: <Number>, // default 1440 when setup, -1 otherwise. avg minutes after appearance before the next as decimal number
        variation: <integer>, // default 5 when setup, -1 otherwise. affects how much appearance times can vary from mean
    },
}

Then, using the server's ID, we can retrieve other information, such as its:
 - Sound effects, categorized in /resources/<server id>/
 - ???

*/

module.exports = {
	// eslint-disable-next-line no-unused-vars
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
				pastAppearance: null,
				meanDelay: -1,
				variation: -1,
			},
		};
	},

	getStatusAsString: async (guild) => {
		const obj = await module.exports.getStatus(guild);
		let result = `Server status for ${guild.name}:\n`;
		if (!obj.setup) {
			result += 'This server has not been setup for the bot yet! Use /setup first.';
			return result;
		}
		result += `Temporal actions (such as hauntings, soul decay) are ${obj.paused ? 'paused' : 'active'}.\n`;
		result += `The next haunting is expected at exactly ${obj.schedule.next.when.nextAppearanceFormatted }. The mean haunting delay is ${obj.schedule.meanDelay} minutes and the variation setting is ${obj.schedule.variation}.\n`;
		result += `This server is ${obj.condemnedMember ? 'being haunted by ' + obj.condemnedMember : 'not currently haunted, somehow. Use /makecondemned to fix'}.\n`;
		if (obj.modRoles.length > 0) {
			result += `The roles which can interact with the bot's admin commands are: `;
			// TODO: iterate over them and print the text of the role, not the @
			result += `.\n`;
		} else {
			result += `The server owner is the only one allowed to use the bot's admin commands now.\n`;
		}
		return result;
	},
};