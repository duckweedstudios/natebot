const { Permissions } = require('discord.js');

module.exports = {
	createHellspeakChannel: (guild, condemnedRole) => {
		return guild.channels.create('HELLSPEAK', {
			type: 'GUILD_VOICE',
			userLimit: 66,
			permissionOverwrites: [
				{
					id: condemnedRole,
					allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.STREAM, Permissions.FLAGS.USE_VAD],
				},
				{
					id: guild.roles.everyone,
					deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.STREAM, Permissions.FLAGS.USE_VAD],
				},
			],
			reason: 'HELLSPEAK is used by the condemned soul for profane purposes...',
		});
	},

	// TODO
	getHellspeakChannelOnServer: () => {
		return;
	},
};