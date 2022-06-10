const { MessageButton } = require('discord.js');


module.exports = {
	name: 'errorButton',
	data: new MessageButton()
		.setCustomId('errorButton')
		.setLabel('!!!ERROR!!!')
		.setStyle('DANGER')
		.setDisabled(true),

	async execute(interaction) {
		await interaction.deferUpdate();
	},
};