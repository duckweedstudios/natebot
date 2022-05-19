// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs'); // Node's native file system module
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
    entersState,
    VoiceConnection
} = require('@discordjs/voice');

const { generateDependencyReport } = require('@discordjs/voice');
const { ConnectionVisibility } = require('discord-api-types/v10');
console.log(generateDependencyReport());

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection(); // extends JavaScript's native Map class, incl more functionality
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Playing audio over voice
// define connection
// const connection = joinVoiceChannel({
// 	channelId: channel.id,
// 	guildId: channel.guild.id,
// 	adapterCreator: channel.guild.voiceAdapterCreator,
// });

// connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
// 	console.log('Connection is in the Ready state!');
// });

// player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
// 	console.log('Audio player is in the Playing state!');
// });

// Login to Discord with your client's token
client.login(token);