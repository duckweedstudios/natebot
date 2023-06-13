const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModelGuild = require('../models/profileSchemaGuild');
const { isMemberDev } = require('../functions/privileges.js');
const { initializeObject } = require('../functions/serverData');
const { createHellspeakChannel, getHellspeakChannelOnServer } = require('../functions/channels.js');
const { createCondemnedRole } = require('../functions/roles.js');
const { guildHauntDriver } = require('../actions/hauntDrivers');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildjoin')
		.setDescription('[owner] Setup the Natebot on the server as desired')
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
		// Assign first condemned (save user id) and assign the role


		// Create the HELLSPEAK voice channel (or check if it exists)
		// Check whether the bot has permission to do so (this doesn't seem to work)
		const botPermissions = interaction.guild.members.me.permissions;
		if (!botPermissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !botPermissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
			try {
				await interaction.reply({ content: `Setup failed (did not have permission to create a private voice channel), please check bot permissions and try again later.`, ephemeral: true });
			} catch (err) {
				console.error(`Error in setup.js: Did not have permission to create HELLSPEAK channel for guild ${interaction.guild.id}: ${err}`);
			}
			return;
		}
		let hellspeakChannelString;
		try {
			const hellspeakChannelsIfExists = await getHellspeakChannelOnServer(interaction.guild);
			if (hellspeakChannelsIfExists && hellspeakChannelsIfExists.size > 0) {
				hellspeakChannelString = hellspeakChannelsIfExists.keys[0];
			} else {
				hellspeakChannelString = createHellspeakChannel(interaction.guild, condemnedRole).id;
			}
			// console.log(`DEBUG: hellspeakChannelString: ${hellspeakChannelString}`);

		} catch (err) {
			console.error(`Error in setup.js: Could not create HELLSPEAK channel: ${err}`);
			interaction.reply({ content: `Setup failed (could not create a voice channel), please try again later.`, ephemeral: true });
			return;
		}

		try {
			const profile = await profileModelGuild.create(
				initializeObject(interaction.guild.id,
					'0',
					(await condemnedRole.id),
					hellspeakChannelString,
					(interaction.options.getRole('mod-role') ? interaction.options.getRole('mod-role') : ''),
					meanDelay,
					randomness));
			profile.save();
			await interaction.reply({
				content: `Server Setup Successful
				${`\n*FETCH ME THEIR SOULS!* \n\nAssign the first condemned soul using the /ncs command!`}`, ephemeral: true,
			});
		} catch (error) {
			console.error(`Setup error: ${error}`);
			await interaction.reply({ content: 'What are you doing? Your server is already setup!', ephemeral: true });
		}

		interaction.client.nateBotData = {
			...interaction.client.nateBotData,
			[interaction.guild.id]: {
				membersWhoFetched: [],
				lastSummonTime: null,
			},
		};

		// Start the hauntings!
		guildHauntDriver(interaction.client, interaction.guild, true);
	},
};