const { MessageActionRow} = require('discord.js');
const { getTarget } = require('../events/getTarget')
const confirmButton = require('../buttons/confirmButton')
const nevermindButton = require('../buttons/nevermindButton')


module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		const button = interaction.client.buttons.get(interaction.customId)


		if (interaction.isCommand()) {
			if (!command) {
				return
			}
			try {
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else if (interaction.isButton()) {
			if (!button) {
				return
			}
			try {
				button.execute(interaction)
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while pressing this button!', ephemeral: true });
			}
		} else if (interaction.isModalSubmit()) {
			try{
				switch (interaction.customId) {
					case 'giftModal':
						target = getTarget(interaction)
						value = interaction.fields.getTextInputValue('giftInput')
						let plural = ''
						if (value === 1) { 
							plural = 'soul'
						} else { 
							plural = 'souls'
						};
						if (value % 1 != 0 || value <= 0) {
							return interaction.reply({content: `Please enter a whole positive integer`, ephemeral: true})
						}
						if ((target) && !(value)) {
							return interaction.reply({content:`Please insert a value to give to ${target.username}!`, ephemeral: true})
						} else if (!(target) && (value)) {
							return interaction.reply({content: `Please provide a user to give ${value} ${plural} to!`, ephemeral: true})
						} else if ((target) && (value)) { 
							finalComponents = new MessageActionRow()
							.addComponents(confirmButton.data)
							.addComponents(nevermindButton.data)
							interaction.client.usersCurrentPrompt = {...interaction.client.usersCurrentPrompt, [interaction.user.id] : interaction.token}
							return interaction.reply({content: `Do you want give **${target.username}** a total of **${value} ${plural}**?`, components: [finalComponents], ephemeral: true});
					}
				}
				// console.log(interaction)
				interaction.reply({content: `There was an error identifying this modal!`, ephemeral: true})
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while submitting this modal!', ephemeral: true });
			}
}}}
