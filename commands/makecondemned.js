const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makecondemned')
        .setDescription('[admin] Force new user as Condemned Soul'),
        // .addUserOption(userOption => userOption
		// 	.setName('first-condemned')
		// 	.setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...')),
        async execute(interaction) {
            // TODO: Check for admin status
            if (false) {
                interaction.reply('You must be an admin to use this command!');
                return;
            }
            // TODO: Check whether Natebot has already been setup
            if (false) {
                interaction.reply('The Natebot has not yet been setup on the server.');
                return;
            }
            //
            const memberTarget = interaction.options.getMember('new-condemned');
            // TODO: Everything relevant, likely duplicate behavior from setup.js
            // TODO: Insert user tag into string below
            interaction.reply('The user is now the new Condemned Soul.');
        }
}