// const { getServerDataFromMemory } = require('./serverData.js');
const { getGuildData } = require('../events/guildquery.js');
const profileModelGuild = require('../models/profileSchemaGuild');

module.exports = {
	// Gets condemned role on server, handling cases when the role no longer exists (perhaps it was deleted)
	getCondemnedRoleOnServer: async (guild) => {
		// TODO: use database rather than memory
		let guildData;
		try {
			guildData = await getGuildData(guild.id);
		} catch (err) {
			console.error(`Error in getCondemnedRoleOnServer: Server data could not be retrieved from the database for guild ${guild.id}: ${err}`);
			return;
		}
		try {
			return await guild.roles.fetch(guildData.settings.condemnedRoleId);
		} catch (err) {
			// A role with that ID does not exist, so we must make one and update data as necessary
			console.log(`Handled error in getCondemnedRoleOnServer: Role with id ${guildData.settings.condemnedRoleId} could not be fetched from guild ${guild.id}, creating new: ${err}`);
			const condemnedRole = module.exports.createCondemnedRole(guild);
			try {
				await profileModelGuild.findOneAndUpdate({
					serverID: guild.id,
				}, {
					$set: {
						settings: {
							condemnedRoleId: (await condemnedRole.id),
						},
					},
				});
			} catch (err) {
				console.error(`Error in getCondemnedRoleOnServer: Could not update information in database for server ${guild.id}: ${err}`);
			}
			return await condemnedRole;
		}
	},

	createCondemnedRole: (guild) => {
		// TODO: permissions?
		try {
			return guild.roles.create({
				name: 'Condemned Soul',
				color: 'BLACK',
				reason: 'Condemned Soul for the Natebot',
			});
		} catch (err) {
			throw new Error(`Error in createCondemnedRole: Could not create role for guild ${guild.id}: ${err}`);
		}
	},

	// Get a role to be assigned to members muted by the condemned soul
	// If it does not exist, create it
	// Importantly, this method simply finds a role with the name 'CS-MUTED'
	// This may not be the best long-term solution but it may actually be better
	// than the alternative of saving it to the database (which would be wasteful)
	getMutedRoleOnServer: async (guild) => {
		let mutedRole = guild.roles.cache.find((role) => role.name === 'CS-MUTED');
		if (!mutedRole) {
			mutedRole = guild.roles.create({
				name: 'CS-MUTED',
				color: 'WHITE',
				reason: 'Members with this role are muted by the Condemned Soul',
				permissions: [],
			});
			guild.channels.cache.forEach(async (channel) => {
				await channel.permissionOverwrites.create((await mutedRole), {
					SPEAK: false,
				});
			});
		}

		return await mutedRole;
	},
};