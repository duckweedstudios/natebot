const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinBruhTest } = require('../actions/hauntings.js');

//module.exports is how you export data in Node.js so that you can require() it in other files.
//If you need to access your client instance from inside a command file, you can access it via interaction.client.
//If you need to access external files, packages, etc., you should require() them at the top of the file.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinvoice')
		.setDescription('Join and leave a voice channel for test purposes'),
	async execute(interaction) {
		//console.log(interaction);
		joinBruhTest(interaction.member.guild);
	},
};