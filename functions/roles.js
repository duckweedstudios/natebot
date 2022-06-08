const { getServerDataFromMemory } = require('./serverData.js');

module.exports = {
	// Gets condemned role on server, handling cases when the role no longer exists (perhaps it was deleted)
	getCondemnedRoleOnServer: async (client, guild) => {
		// TODO: use database rather than memory (does not eliminate need for client parameter)
		const serverDataObject = getServerDataFromMemory(client, guild.id);
		try {
			return await guild.roles.fetch(serverDataObject.condemnedRoleId);
		} catch (err) {
			// A role with that ID does not exist, so we must make one and update data as necessary
			console.log(`Handled error in getCondemnedRoleOnServer: Role with id ${serverDataObject.condemnedRoleId} could not be fetched from guild ${guild.id}, creating new: ${err}`);
			const condemnedRole = module.exports.createCondemnedRole(guild);
			client.nateBotData[guild.id].condemnedRoleId = condemnedRole.id;
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
};