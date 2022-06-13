const profileModel = require ('../models/profileSchema');
const { editPrompt } = require('../events/editPrompt');

module.exports = {
	name: 'set',
	setValue : async (interaction, target, datapoint, value) => {
		try {
			const targetData = await profileModel.findOne({ fetcherID: target.id });
			if (!targetData) return editPrompt(interaction, ({ content: `There is no user with the username ${target.username}`, ephemeral: true }));

			await profileModel.findOneAndUpdate({ fetcherID: target.id }, {
				$set: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
			editPrompt(interaction, ({ content: `There was an error`, ephemeral: true }));
		}
		return target;
	},
};