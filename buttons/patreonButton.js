const { MessageButton } = require('discord.js');

module.exports = {
	name: 'patreonButton',
	data: new MessageButton()
		.setLabel('Our Patreon')
		.setURL('https://patreon.com/CondemnedSoulsBot')
		.setStyle('LINK'),
};