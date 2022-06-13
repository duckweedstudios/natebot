const profileModel = require ('../models/profileSchema');

module.exports = {
	name: 'set',
	setValue : async (interaction, target, datapoint, value) => {
		try {
			const targetData = await profileModel.findOne({ fetcherID: target.id, serverID: interaction.guild.id });
			if (!targetData) return interaction.reply ({ content: `There is no user with the username ${target.username}`, ephemeral: true });

			await profileModel.findOneAndUpdate({ fetcherID: target.id, serverID: interaction.guild.id }), {
				$set: {
					datapoint: value,
				},
			};
		} catch (err) {
			console.log(err);
			interaction.reply('there was an error changing this users value');
		}
		return target;
	},
};