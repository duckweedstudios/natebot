const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'set',
	setValue : async (interaction, target, datapoint, value) => {
		try {
			const targetData = await profileModel.findOne({ fetcherID: target.id });
			await profileModel.findOneAndUpdate({ fetcherID: target.id }, {
				$set: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
};