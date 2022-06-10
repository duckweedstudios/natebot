const { MessageButton } = require('discord.js');


module.exports = {
	name: 'serverStatsButton',
	data: new MessageButton()
		.setCustomId('serverStatsButton')
		.setLabel('Server Stats 📊')
		.setStyle('SECONDARY'),
    
	async execute(interaction) {
		await interaction.reply({ content:'Server Stats Menu', ephemeral: true });
	},
};