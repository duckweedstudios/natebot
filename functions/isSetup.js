const { checkSoulDataExists } = require('../events/query');
const { checkGuildDataExists } = require('../events/guildquery');

module.exports = {
	isUserSetup : async (interaction, userId) => {
		return await checkSoulDataExists(interaction.guild.id, userId);
	},

	isGuildSetup : async (interaction) => {
		return await checkGuildDataExists(interaction.guild.id);
	},
};