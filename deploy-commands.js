const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('joinvoice').setDescription('[dev] Join and leave a voice channel for test purposes'),
	new SlashCommandBuilder().setName('setup').setDescription('[admin] Setup the Natebot on the server as desired')
		.addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...'))
		.addIntegerOption(intOption => intOption 
			.setName('mean-delay').setDescription('The mean delay between hauntings in minutes. Defaults to 1440 (24 hours).'))
		.addIntegerOption(intOption => intOption
			.setName('randomness').setDescription('The randomness metric for hauntings. Higher gives more variation. Defaults to 5.')),
	new SlashCommandBuilder().setName('pause').setDescription('[admin] Pause Natebot activities on the server'),
	new SlashCommandBuilder().setName('resume').setDescription('[admin] Resume Natebot activities on the server'),
	new SlashCommandBuilder().setName('makecondemned').setDescription('[admin] Force new user as Condemned Soul')
		.addUserOption(userOption => userOption
			.setName('new-condemned').setDescription('The new condemned user').setRequired(true)),
	new SlashCommandBuilder().setName('help').setDescription('Display the bot\'s commands and other information.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);