const { SlashCommandBuilder } = require("@discordjs/builders");
const { getServerDataFromMemory } = require('../functions/serverData.js');
const { isMemberPrivileged } = require('../functions/privileges.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makecondemned').setDescription('[admin] Force new user as Condemned Soul')
        .addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...').setRequired(true)),
    async execute(interaction) {
        // Check whether Natebot has already been setup
        let serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
        if (serverDataObject === null) {
            interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
            return;
        }
        // TODO: Check for admin status
        if (isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
            interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
            return;
        }
        //
        const memberTarget = interaction.options.getMember('new-condemned');
        interaction.client.nateBotData[interaction.guild.id.toString()].condemnedSoul = memberTarget.user.id;
        // TODO: Everything relevant, likely duplicate behavior from setup.js
        // TODO: Insert user tag into string below
        console.log(interaction.client.nateBotData);
        interaction.reply(`${memberTarget.user.tag} is now the Condemned Soul. Kind of... (wip)`);
    }
}