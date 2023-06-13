const profileModel = require ('../models/profileSchema');
const { editPrompt } = require('../events/editPrompt');

module.exports = {
	name: 'inc',
	increaseValue : async (interaction, target, datapoint, value) => {
		try {
			const targetData = await profileModel.findOne({ fetcherID: target.id });
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