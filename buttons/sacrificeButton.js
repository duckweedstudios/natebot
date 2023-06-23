const { MessageButton } = require('discord.js');

module.exports = {
	name: 'sacrificeButton',
	data: new MessageButton()
		.setCustomId('sacrificeButton')
		.setLabel('Sacrifice 🩸')
		.setStyle('DANGER')
		.setDisabled(true),
    
	async execute(interaction) {
		await interaction.reply({ content:'🚧 this will bring up the Sacrifice Menu 🚧', ephemeral: true });
	},
};