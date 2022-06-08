const { SlashCommandBuilder } = require('@discordjs/builders');
const { initializeObject } = require('../functions/serverData.js');
const { guildHauntDriver } = require('../actions/testingHauntings.js');
const { isMemberOwner } = require('../functions/privileges.js');
const { createCondemnedRole } = require('../functions/roles.js');
const { createHellspeakChannel } = require('../functions/channels.js');

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
		// Ensure target isn't a bot
		if (interaction.options.getMember('first-condemned') && interaction.options.getMember('first-condemned').user.bot) {
			if (interaction.options.getMember('first-condemned').id === '974345779349184542') {
				interaction.reply({ content: 'I am flattered, but I must refuse. Choose a user instead.', ephemeral: true });
				return;
			} else {
				interaction.reply({ content: 'A puny bot cannot bear the mantle of Condemned Soul. Choose a user instead.', ephemeral: true });
				return;
			}
		}

		// Create the condemned soul role on the server (assuming it doesn't exist)
		let condemnedRole;
		try {
			condemnedRole = await createCondemnedRole(interaction.guild);
		} catch (err) {
			console.error(err);
			interaction.reply({ content: 'Setup failed (could not create role), please try again later.', ephemeral: true });
			return;
		}
		
		// Assign first condemned (save user id) and assign the role
		let memberTarget;
		if (!interaction.options.getMember('first-condemned')) {
			memberTarget = interaction.member.id;
			interaction.member.roles.add((await condemnedRole));
		} else {
			memberTarget = interaction.options.getMember('first-condemned').id;
			interaction.options.getMember('first-condemned').roles.add((await condemnedRole));
		}

		// Create the HELLSPEAK voice channel
		// TODO: configure permissions so it is only visible to the condemned soul and server moderators
		let hellspeakChannel;
		try {
			hellspeakChannel = createHellspeakChannel(interaction.guild, condemnedRole);
		} catch (err) {
			console.error(`Error in setup.js: Could not create HELLSPEAK channel: ${err}`);
			interaction.reply({ content: `Setup failed (could not create a voice channel), please try again later.`, ephemeral: true });
			return;
		}
		

		// For now, save server info object to client
		const newServerDataObject = initializeObject(memberTarget, (await condemnedRole.id), hellspeakChannel.id, [], meanDelay, randomness);
		const serverIdString = interaction.guild.id.toString();
		interaction.client.nateBotData = { ...interaction.client.nateBotData, [serverIdString] : newServerDataObject };

		// TODO: Save to database that this server is setup (by its ID, so it can be accessed)

		// Start the hauntings!
		guildHauntDriver(interaction.client, interaction.guild);

		interaction.reply(`I hope you know what you've begun...\n<@${memberTarget}>, it's time to set your sound.`);
	},
};