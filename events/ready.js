// const testingHauntings = require('../actions/testingHauntings.js');
// const { hauntSomeChannelWithRandomSound } = require('../actions/hauntings.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// TODO: Read from database, if necessary? Loading all info into memory is impractical, though.


		// setInterval(joinOnInterval(client), 45000);
		// testingHauntings.beginRepeatingTest(client);

		// Deleting a command
		// console.log(client.application);
		// client.application.commands.delete()
		// From a guild-only command
		// client.guilds.fetch('672609929495969813')
		//     .then(guild => guild.commands.delete('974371857937608724'))
		//     .then(console.log);
	},
};