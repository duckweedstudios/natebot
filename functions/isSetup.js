const { checkSoulDataExists } = require('../events/query');
const { checkGuildDataExists } = require('../events/guildquery');

module.exports = {
	isUserSetup : async (interaction, userId) => {
		console.log(`checking for User ${userId} in Guild ${interaction.guild.id}`);
		return await checkSoulDataExists(interaction.guild.id, userId);
	},

	isGuildSetup : async (interaction) => {
		console.log(checkGuildDataExists(interaction.guild.id));
		return await checkGuildDataExists(interaction.guild.id);
	},
};