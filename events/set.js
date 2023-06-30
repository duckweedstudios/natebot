const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'set',
	setValue : async (interaction, target, datapoint, value) => {
		try {
			await profileModel.findOneAndUpdate({ fetcherId: target.id }, {
				$set: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
};