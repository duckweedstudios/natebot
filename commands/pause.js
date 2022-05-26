const { SlashCommandBuilder } = require("@discordjs/builders");
const { getServerDataFromMemory} = require('../functions/serverData.js');
const { isMemberPrivileged } = require('../functions/privileges.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('[admin] Pause Natebot activities on this server'),
    async execute(interaction) {
        // Check whether Natebot has already been setup
        let serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
        if (serverDataObject === null) {
            interaction.reply('The Natebot has not yet been setup on the server.');
            return;
        }
        // TODO: Check for admin status
        if (isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
            interaction.reply('You must be an admin to use this command!');
            return;
        }
        // TODO: Check whether Natebot is already paused on this server
        if (false) {
            interaction.reply('The Natebot is already paused.');
            return;
        }
        //
        // TODO: Save to database that this server is paused
        // Perhaps via a flag, rather than removing from the database?
        interaction.reply('All temporal Natebot functions (hauntings, soul decay) are paused.');
    }
}