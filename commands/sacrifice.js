const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sacrifice')
		.setDescription('sacrifice your souls and embrace your infernal power!'),
	async execute(interaction) {
		
		const giftModal = new Modal()
			.setCustomId('giftModal')
			.setTitle('Send a Gift of Souls');

		const favoriteColorInput = new TextInputComponent()
			.setCustomId('favoriteColorInput')
			.setLabel("What's your favorite color?")
			.setStyle('SHORT');

		const hobbiesInput = new TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			.setStyle('PARAGRAPH');

		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);

		giftModal.addComponents(firstActionRow, secondActionRow);
		
		await interaction.showModal(giftModal)
	},
};