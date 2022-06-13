const { MessageButton } = require('discord.js');


module.exports = {
	name: 'claimButton',
	data: new MessageButton()
		.setCustomId('claimButton')
		.setLabel('🔥🔥CLAIM🔥🔥')
		.setStyle('DANGER')
		.setDisabled(true),

	async execute(interaction) {
		await interaction.reply({ content:`${interaction.user.tag} IS THE NEW CONDEMNED SOUL!!` });
	},
};