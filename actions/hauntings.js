const fs = require('fs');
const path = require('path');

const {
	AudioPlayerStatus,
	//StreamType,
	createAudioPlayer,
	NoSubscriberBehavior,
	createAudioResource,
	joinVoiceChannel,
    //entersState,
    //VoiceConnection,
	VoiceConnectionStatus
} = require('@discordjs/voice');

module.exports = {
    joinBruhTest: async (guild) => {
        // Goal: Playing audio over voice
		// Define connection
		const guildChannels = await guild.channels.fetch();
		const guildVoiceChannels = guildChannels.filter((v,k,m) => v.type==='GUILD_VOICE');
		//guildVoiceChannels.forEach((v,k,m) => console.log(`${v.name}, ${v.id}`));
		//console.log(guildVoiceChannels.at(1));

		//console.log(`${guildVoiceChannels.at(0).id}, ${interaction.guildId}, ${interaction.member.guild.voiceAdapterCreator}`);
		// Connect to a voice channel
		const connection = joinVoiceChannel({
			channelId: guildVoiceChannels.at(0).id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false
		});

		// Report ready status
		connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
			console.log('Connection is in the Ready state!');
		});

		// ---------------------------------------------------------------------------
		// This is how you would access a created connection elsewhere in code without
		// having to track connections yourself. It is best practice to not track the 
		// voice connections yourself. 
		// const connection = getVoiceConnection(myVoiceChannel.guild.id); //where getVoiceConnection comes from discordjs/voice
		// And destroy a voice connection using connection.destroy()
		// ---------------------------------------------------------------------------

		// Now, the bot is in the first VC and ready to transmit audio

		// Tramsitting audio
		// Create a player instance
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause, // can be configured to either pause, stop, or continue when there are no active subscribers
			},
		});

		// Report playing status
		player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
			console.log('Audio player is in the Playing state!');
		});

		player.on(AudioPlayerStatus.Idle, (oldState, newState) => {
			console.log('Audio player is idle...');
		});

		// player.addListener('stateChange', (oldState, newState) => {
		// 	console.log(`${oldState.status}, ${newState.status}`);
		// })
		// console.log(fs.existsSync(path.join(__dirname, '../resources/global/Bruh.mp3')));
		// Create a resource
		const resource = createAudioResource(path.join(__dirname, '../resources/global/Bruh.mp3'), {
			metadata: {
				title: 'Bruh!',
			},
		});

		// Subscribe the connection to the audio player (will play audio on the voice connection)
		const subscription = connection.subscribe(player);

		// Play a resource
		player.play(resource, {
			volume: 1
		});
		//console.log(resource);
		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
		});

		//setTimeout(() => player.play(resource2), 2000);
		// subscription could be undefined if the connection is destroyed!
		if (subscription) {
			// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
			setTimeout(() => subscription.unsubscribe(), 7_000);
			setTimeout(() => connection.destroy(), 8_000);
		}

		//setTimeout(() => connection.destroy(), 10_000);
    }
}