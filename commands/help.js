const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Display the bot\'s commands and other information.'),

	// TODO: This should just display Zade's embed instead of the following.
	async execute(interaction) {
		// TODO
		const result = `
            COMMANDS:\n
            
            CONDEMNED COMMANDS:\n

            ADMIN COMMANDS:\n
            /makecondemned\n
            /pause\n
            /resume\n
            /setup\n
            `;
		interaction.reply(result);
	},
};