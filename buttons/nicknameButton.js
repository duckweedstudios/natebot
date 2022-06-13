const { MessageButton } = require('discord.js');


module.exports = {
	name: 'nicknameButton',
	data: new MessageButton()
		.setCustomId('nicknameButton')
		.setLabel('Change Name 😠')
		.setStyle('SECONDARY')
		.setDisabled(true),
        
	async execute(interaction) {
		await interaction.reply({ content:'Will change a users name for souls', ephemeral:true });
	},
};