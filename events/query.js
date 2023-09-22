const profileModel = require ('../models/profileSchema');

module.exports = {
	getSoulData: async (interaction, userId) => {
		try {
			const soulData = await profileModel.findOne({
				serverId: interaction.guild.id,
				fetcherId: userId,
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
				serverId: guildId,
				fetcherId: userId,
			});
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling this users information from the database');
		}
	},
};