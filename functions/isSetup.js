const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');

module.exports = {
	isUserSetup : async (interaction, userId) => {
		const soulData = await getSoulData(interaction, userId);
		if (!soulData) {
			return false;
		} else {
			return true;
		}
	},

	isGuildSetup : async (interaction) => {
		const guildData = await getGuildData(interaction);
		if (!guildData) {
			return false;
		} else {
			return true;
		}
	},
};