const { Modal, TextInputComponent, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'giftButton',
	data: new MessageButton()
		.setCustomId('giftButton')
		.setLabel('Send a Gift! 🎁')
		.setStyle('SUCCESS'),
	
	async execute(interaction) {
		const giftModal = new Modal()
			.setCustomId('giftModal')
			.setTitle('Send a Gift of Souls');

		const giftInput = new TextInputComponent()
			.setCustomId('giftInput')
			.setLabel('How many souls would you like to give?')
			.setStyle('SHORT');

		const firstActionRow = new MessageActionRow().addComponents(giftInput);

		giftModal.addComponents(firstActionRow);

		await interaction.showModal(giftModal);
	},
};