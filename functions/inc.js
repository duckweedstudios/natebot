const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'inc',
	increaseValue : async (interaction, id, datapoint, value) => {
		try {
			await profileModel.findOneAndUpdate({ serverId: interaction.guild.id, fetcherId: id }, {
				$inc: {
					[datapoint]: value,
				},
			});
		} catch (err) {
			console.log(err);
		}
	},
};