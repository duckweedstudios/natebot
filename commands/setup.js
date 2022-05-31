const { SlashCommandBuilder } = require("@discordjs/builders");
const { initializeObject, getServerDataFromMemory } = require('../functions/serverData.js');
const { guildHauntDriver } = require('../actions/testingHauntings.js');
const { isMemberOwner } = require('../functions/privileges.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('[owner] Setup the Natebot on the server as desired')
        .addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...'))
        .addIntegerOption(intOption => intOption 
            .setName('mean-delay').setDescription('The mean delay between hauntings in minutes. Defaults to 1440 (24 hours).'))
        .addIntegerOption(intOption => intOption
            .setName('randomness').setDescription('The randomness metric for hauntings. Higher gives more variation. Defaults to 5.')),
    async execute(interaction) {
        // Check for admin status
        if (isMemberOwner(interaction.member, interaction.client, interaction.guild)) {
            interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
            return;
        }
        // Check if arguments are valid
        let meanDelay = interaction.options.getInteger('mean-delay');
        if (!meanDelay) {
            meanDelay = 1440;
        } else if (meanDelay < 2) {
            interaction.reply({ content: 'The mean delay must be at least two minutes.', ephemeral: true });
            return;
        }
        let randomness = interaction.options.getInteger('randomness');
        if (!randomness) {
            randomness = 5;
        } else if (randomness < 1 || randomness > 10) {
            interaction.reply({ content: 'Randomness must be an integer between 1 and 10.', ephemeral: true });
            return;
        }
        // Assign first condemned (save user id)
        let memberTarget;
        if (!interaction.options.getMember('first-condemned')) {
            memberTarget = interaction.member.user.id;
        } else {
            memberTarget = interaction.options.getMember('first-condemned').user.id;
        }
        // TODO: actually assign the role

        // For now, save server info object to client
        let newServerDataObject = initializeObject(memberTarget, [], meanDelay, randomness);
        let serverIdString = interaction.guild.id.toString();
        interaction.client.nateBotData = { ...interaction.client.nateBotData, [serverIdString] : newServerDataObject };
        console.log(interaction.client.nateBotData);

        // TODO: Save to database that this server is setup (by its ID, so it can be accessed)

        // Start the hauntings!
        guildHauntDriver(interaction.client, interaction.guild);

        interaction.reply(`I hope you know what you've begun...\n${interaction.member.tag}, it's time to set your sound.`);
    }
}