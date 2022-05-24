const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('joinvoice').setDescription('Join and leave a voice channel for test purposes'),
	new SlashCommandBuilder().setName('setup').setDescription('[admin] Setup the Natebot on the server as desired')
		.addUserOption(userOption => userOption
			.setName('first-condemned')
			.setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...')),
	new SlashCommandBuilder().setName('pause').setDescription('[admin] Pause Natebot activities on the server'),
	new SlashCommandBuilder().setName('resume').setDescription('[admin] Resume Natebot activities on the server'),
	new SlashCommandBuilder().setName('makecondemned').setDescription('[admin] Force new user as Condemned Soul')
		.addUserOption(userOption => userOption
			.setName('new-condemned')
			.setDescription('The new condemned user')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);