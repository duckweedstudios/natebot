const profileModel = require ('../models/profileSchema');

module.exports = {
	getSoulData: async (interaction, userId) => {
		try {
			const soulData = await profileModel.findOne({
				fetcherId: userId,
				serverId: interaction.guild.id,
			});
			return soulData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling this users information from the database');
		}
	},
	checkSoulDataExists: async (guildId, userId) => {
		try {
			return await profileModel.exists({
				fetcherId: userId,
				serverId: guildId,
			});
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling this users information from the database');
		}
	},
};