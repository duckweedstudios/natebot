const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const profileModelGuild = require('../models/profileSchemaGuild');
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
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...').setRequired(true)),
	async execute(interaction) {
		// Check for admin status (for now only developers have access)
		if (!isMemberDev(interaction.member.id)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		// Check if target member is a bot
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
		let memberTarget = interaction.options.getMember('first-condemned');
		// try {
		// 	if (!canModerateMember(memberTarget)) {
		// 		roleAssignmentSuccess = false;
		// 	} else {
		// 		memberTarget.roles.add((await condemnedRole));
		// 	}
		// } catch(error) {
		// 	console.log(error)
		// 	interaction.reply({ content: `Setup failed; Role assignment Error.`, ephemeral: true });
		// }

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
			const profile = await profileModel.create({
				fetcherTag: memberTarget.user.username,
				fetcherID: memberTarget.id,
				serverID: memberTarget.guild.id,
				souls: 100,
				soulsCaught: 0,
				careerSouls: 0,
				condemnedCount: 1,
				soulXP: 0,
				fetchCount: 0,
				gotFooledCount: 0,
				fooledCount: 0,
				autoLure: false,
			});
			profile.save();
		} catch (error) {
			console.error('Condemned user already exists');
		}
		
		try {
			const guildProfile = await profileModelGuild.create(
				initializeObject(interaction.guild.id,
					memberTarget.id,
					(await condemnedRole.id),
					hellspeakChannelString
					));
			guildProfile.save();
			await interaction.reply({content: `${memberTarget.user.username} has become **T̸̪́Ḥ̷̞̏̔Ē̵̦ ̶̰̍̀C̴̟͇͒̑O̸͈̊Ņ̸̱̀D̵̼͌Ĕ̴̝̕M̶̢̎̀Ń̵̦͆Ĕ̷̡͈͝D̵̬͗̓**\n\n**FETCH ME THEIR SOULS!**\n\nUse the /join command to play!`});
			//Start the hauntings!
			guildHauntDriver(interaction.client, interaction.guild, true);
		} catch (error) {
			console.error(`Setup error: ${error}`);
			await interaction.reply({ content: 'What are you doing? Your server is already setup!', ephemeral: true });
		}

		interaction.client.memory = {
			...interaction.client.memory,
			[interaction.guild.id]: {
				membersWhoFetched: [],
				lastSummonTime: null,
			},
		};
	},
};