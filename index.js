const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { mongodbsrv } = require('./config.json');
const { generateDependencyReport } = require('@discordjs/voice');
console.log(generateDependencyReport());

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });

// EVENT HANDLER
client.events = new Collection();
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// COMMAND HANDLER
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// BUTTON HANDLER
client.buttons = new Collection();
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	client.buttons.set(button.name, button);
}

// MONGOOSE PORT
mongoose.connect(mongodbsrv, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>{
	console.log('Connected to the Database');
})
.catch((err) => {
	console.log(err)
})

client.usersCurrentMenuToken = [null];
client.usersCurrentTarget = [null];
client.usersCurrentPrompt - [null];
client.nateBotData = null;

// Login to Discord with your client's token
client.login(token);