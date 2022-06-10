const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('gives souls to another user')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of souls to give'))
		.addUserOption(option => option.setName('target').setDescription('The recieving user')),
	async execute(interaction) {

		// Value and Target Entry with Error Messages
		const recipient = interaction.options.getUser('target');
		const value = interaction.options.getInteger('amount');
		let plural = '';
		if (value === 1) {
			plural = 'soul';
		} else {
			plural = 'souls';
		}
		if (value % 1 != 0 || value <= 0) {
			return interaction.reply({ content: `Please enter a whole positive integer`, ephemeral: true });
		}
		if ((recipient) && !(value)) {
			return interaction.reply({ content:`Please insert a value to give to ${recipient.username}!`, ephemeral: true });
		} else if (!(recipient) && (value)) {
			return interaction.reply({ content: `Please provide a user to give ${value} ${plural} to!`, ephemeral: true });
		} else if ((recipient) && (value)) {
			// return interaction.reply({content: `Do you want give ${recipient.username} ${value} ${plural}?`, ephemeral: true, components: [giftButtons] });
			try {
				const targetData = await profileModel.findOne({ fetcherID: recipient.id });
				if (!targetData) return interaction.reply ('This User doesn\'t exist');
	
				await profileModel.findOneAndUpdate({ fetcherID: recipient.id }, {
					$inc: {
						soulcage: value,
					},
				});
				await profileModel.findOneAndUpdate({ fetcherID: interaction.user.id }, {
					$inc: {
						soulcage: -value,
					},
				});
				await interaction.reply({ content:`You have given ${recipient.username} ${value} ${plural}!`, ephemeral:true });
			} catch (err) {
				console.log(err);
				interaction.reply('there was an error');
			}
		}
	
		// Making Button Replies
	},
};