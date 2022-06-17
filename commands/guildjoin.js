const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchemaGuild');
const { isMemberDev, canModerateMember } = require('../functions/privileges.js');
const { initializeObject } = require('../functions/serverData');
const { createHellspeakChannel, getHellspeakChannelOnServer } = require('../functions/channels.js');
const { createCondemnedRole } = require('../functions/roles.js');
const { guildHauntDriver } = require('../actions/hauntDrivers');
const { Permissions } = require('discord.js');

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
		// Check for admin status (for now only developers have access)
		if (!isMemberDev(interaction.member.id)) {
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

		// Create the condemned soul role on the server (or check if it exists)
		let condemnedRole = interaction.guild.roles.cache.find((role) => role.name === 'Condemned Soul');
		if (!condemnedRole) {
			try {
				condemnedRole = await createCondemnedRole(interaction.guild);
			} catch (err) {
				console.error(err);
				interaction.reply({ content: 'Setup failed (could not create role), please try again later.', ephemeral: true });
				return;
			}
		}
		let roleAssignmentSuccess = true;
		// Assign first condemned (save user id) and assign the role
		let memberTarget;
		if (!interaction.options.getMember('first-condemned')) {
			memberTarget = interaction.member;
			if (!canModerateMember(memberTarget)) {
				roleAssignmentSuccess = false;
			} else {
				memberTarget.roles.add((await condemnedRole));
			}
		} else {
			memberTarget = interaction.options.getMember('first-condemned');
			if (!canModerateMember(memberTarget)) {
				roleAssignmentSuccess = false;
			} else {
				memberTarget.roles.add((await condemnedRole));
			}
		}

		// Create the HELLSPEAK voice channel (or check if it exists)
		// Check whether the bot has permission to do so (this doesn't seem to work)
		const botPermissions = interaction.guild.me.permissions;
		if (!botPermissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !botPermissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
			try {
				await interaction.reply({ content: `Setup failed (did not have permission to create a private voice channel), please check bot permissions and try again later.`, ephemeral: true });
			} catch (err) {
				console.error(`Error in setup.js: Did not have permission to create HELLSPEAK channel for guild ${interaction.guild.id}: ${err}`);
			}
			return;
		}
		let hellspeakChannel;
		try {
			const hellspeakChannelsIfExists = getHellspeakChannelOnServer(interaction.guild);
			if (hellspeakChannelsIfExists) {
				hellspeakChannel = hellspeakChannelsIfExists[0];
			} else {
				hellspeakChannel = createHellspeakChannel(interaction.guild, condemnedRole);
			}
			
		} catch (err) {
			console.error(`Error in setup.js: Could not create HELLSPEAK channel: ${err}`);
			interaction.reply({ content: `Setup failed (could not create a voice channel), please try again later.`, ephemeral: true });
			return;
		}

		try {
			const profile = await profileModel.create(
				initializeObject(interaction.guild.id,
					memberTarget.id,
					(await condemnedRole.id),
					hellspeakChannel.id,
					(interaction.options.getRole('mod-role') ? interaction.options.getRole('mod-role') : ''),
					meanDelay,
					randomness));
			profile.save();
			await interaction.reply({ content: `Server setup.
				${roleAssignmentSuccess ? `\nFETCH ME THEIR SOULS!` : `\nRole could not be assigned to <@${memberTarget.id}>, so you should do it manually.`}`, ephemeral: true });
		} catch (error) {
			// console.log(error);
			await interaction.reply({ content:'What are you doing? Your server is already setup!', ephemeral: true });
			// return; // for testing purposes leave this in
		}

		interaction.client.nateBotData = { ... interaction.client.nateBotData, [interaction.guild.id] : { membersWhoFetched: [] } };

		// Start the hauntings!
		guildHauntDriver(interaction.client, interaction.guild, true);
	},
};