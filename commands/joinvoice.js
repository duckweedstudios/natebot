const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinBruhTest } = require('../actions/hauntings.js');
const { isMemberDev } = require('../functions/privileges.js');

// module.exports is how you export data in Node.js so that you can require() it in other files.
// If you need to access your client instance from inside a command file, you can access it via interaction.client.
// If you need to access external files, packages, etc., you should require() them at the top of the file.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinvoice')
		.setDescription('[dev] Join and leave a voice channel for test purposes'),
	async execute(interaction) {
		// TODO: Check for admin status
		if (isMemberDev(interaction.member.user.id)) {
			interaction.reply({ content: 'You must be a Natebot developer to use this command!', ephemeral: true });
			return;
		}
		joinBruhTest(interaction.member.guild);
	},
};