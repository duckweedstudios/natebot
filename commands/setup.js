const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('[admin] Setup the Natebot on the server as desired')
        .addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...'))
        .addIntegerOption(intOption => intOption 
            .setName('mean-delay').setDescription('The mean delay between hauntings in minutes. Defaults to 1440 (24 hours).'))
        .addIntegerOption(intOption => intOption
            .setName('randomness').setDescription('The randomness metric for hauntings. Higher gives more variation. Defaults to 5.')),
    async execute(interaction) {
        // TODO: Check for admin status
        if (false) {
            interaction.reply('You must be an admin to use this command!');
            return;
        }
        // TODO: Check whether Natebot has already been setup
        if (false) {
            interaction.reply('Too late, the Natebot has already been unleashed on this server!');
            return;
        }
        // Assign first condemned
        let memberTarget;
        if (!interactions.options.getMember('first-condemned')) {
            memberTarget = interaction.member;
        } else {
            memberTarget = interaction.options.getMember('first-condemned');
        }
        // TODO: actually assign the role

        // TODO: Save to database that this server is setup (by its ID, so it can be accessed)
        interaction.reply('I hope you know what you\'ve begun...');
    }
}