const { MessageButton } = require('discord.js');


module.exports = {
	name: 'claimButton',
	data: new MessageButton()
		.setCustomId('claimButton')
		.setLabel('🔥🔥CLAIM🔥🔥')
		.setStyle('DANGER')
		.setDisabled(true),

	async execute(interaction) {
		await interaction.reply({ content:'Will claim condemned soul role', ephemeral:true });
	},
};