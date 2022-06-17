const testprofileModel = require ('../models/testprofileSchema');

// 
module.exports = {
	getSoulData : async (interaction, userId) => {
		try {
			const soulData = await testprofileModel.findOne({
				fetcherID: userId,
				serverID: interaction.guild.id,
			});
			return soulData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling this users information from the database');
		}
	} };