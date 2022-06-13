const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchemaGuild');
const { isMemberOwner } = require('../functions.js');
const { initializeObject } = require('../functions/serverData');
const { createHellspeakChannel } = require('../functions/channels.js');
const { createCondemnedRole } = require('../functions/roles.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildjoin')
		.setDescription('[owner] Setup the Natebot on the server as desired')
		.addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...'))
		.addIntegerOption(intOption => intOption
			.setName('mean-delay').setDescription('The mean delay between hauntings in minutes. Defaults to 1440 (24 hours).'))
		.addIntegerOption(intOption => intOption
			.setName('randomness').setDescription('The randomness metric for hauntings. Higher gives more variation. Defaults to 5.'))
		.addRoleOption(roleOption => roleOption
			.setName('mod-role').setDescription('The moderator role which can interact with the bot\'s settings.')),
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
		let hellspeakChannel;
		try {
			hellspeakChannel = createHellspeakChannel(interaction.guild, condemnedRole);
		} catch (err) {
			console.error(`Error in setup.js: Could not create HELLSPEAK channel: ${err}`);
			interaction.reply({ content: `Setup failed (could not create a voice channel), please try again later.`, ephemeral: true });
			return;
		}

		try {
			const profile = await profileModel.create(
				initializeObject(interaction.guild.id,
					memberTarget,
					(await condemnedRole.id),
					hellspeakChannel.id,
					(interaction.options.getRole('mod-role') ? interaction.options.getRole('mod-role') : ''),
					meanDelay,
					randomness));
			profile.save();
			await interaction.reply({ content: 'setup success\nFETCH ME THEIR SOULS!', ephemeral: true });
		} catch (error) {
			console.log(error);
			await interaction.reply({ content:'What are you doing? Your server is already setup!', ephemeral: true });
		}
	},
};