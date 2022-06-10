const profileModel = require ('../models/profileSchema');

// 
module.exports = {
	getSoulData : async (userId) => {
		try {
			const soulData = await profileModel.findOne({ fetcherID: userId });
			return soulData;
		} catch (err) {
			console.log(err);
			throw new Error('There was an error pulling this users information from the database');
		}
	} };