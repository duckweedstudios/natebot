const testprofileModelGuild = require ('../models/testprofileSchemaGuild');

// 
module.exports = {
	getGuildData : async (tempServerId) => {
		try {
			const guildData = await testprofileModelGuild.findOne({ serverID: tempServerId });
			return guildData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling server information from the database');
		}
	} };