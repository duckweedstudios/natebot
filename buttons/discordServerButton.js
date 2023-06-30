const { MessageButton } = require('discord.js');

module.exports = {
	name: 'discordServerButton',
	data: new MessageButton()
		.setLabel('Souls Discord')
		.setURL('https://discord.gg/6gU8M49CrA')
		.setStyle('LINK'),
};