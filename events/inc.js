const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'inc',
	increaseValue : async (interaction, target, datapoint, value) => {
		try {
			await profileModel.findOneAndUpdate({ fetcherID: target.id }, {
				$inc: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
};