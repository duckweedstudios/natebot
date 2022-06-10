const { MessageButton } = require('discord.js');


module.exports = {
	name: 'sacrificeButton',
	data: new MessageButton()
		.setCustomId('sacrificeButton')
		.setLabel('Sacrifice 🩸')
		.setStyle('DANGER'),
    
	async execute(interaction) {
		await interaction.reply({ content:'This will bring up the Sacrifice Menu', ephemeral: true });
	},
};