const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'set',
	setValue : async (interaction, id, datapoint, value) => {
		try {
			await profileModel.findOneAndUpdate({ fetcherID: id }, {
				$set: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
};