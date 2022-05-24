const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('[admin] Resume Natebot activities on this server'),
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
        // TODO: Check whether Natebot is already unpaused on this server
        if (false) {
            interaction.reply('The Natebot is already unpaused.');
            return;
        }
        //
        // TODO: Save to database that this server is setup 
        // Perhaps by modifying a flag rather than adding to the database

        // TODO: Check whether hauntings have been skipped while paused
        // We will not make up for missed hauntings or soul decay,
        // but we must regenerate the haunting schedule
        interaction.reply('All temporal Natebot functions (hauntings, soul decay) have resumed.');
    }
}