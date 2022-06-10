const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('fetches a soul!'),
	async execute(interaction) {
		const soulsCaught = Math.floor(Math.random() * 5 + 1);
		let plural = '';
		if (soulsCaught === 1) {
			plural = 'soul!';
		} else {
			plural = 'souls!';
		}

		await profileModel.findOneAndUpdate({
			fetcherID: interaction.user.id,
		}, {
			$inc: {
				souls: soulsCaught,
				soulcage: soulsCaught,
				careersouls: soulsCaught,
			},
		});
		await interaction.reply({ content: `You have fetched ${soulsCaught} ${plural}`, ephemeral: true });
	},
};