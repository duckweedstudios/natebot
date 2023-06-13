const path = require('path');
const {
	AudioPlayerStatus,
	createAudioPlayer,
	NoSubscriberBehavior,
	createAudioResource,
	joinVoiceChannel,
	VoiceConnectionStatus,
} = require('@discordjs/voice');
const { getAudioResourceFromSoul, getWeightedRandomSoulType } = require('../functions/souls.js');

// TODO: Stability testing across different connection problem scenarios.

module.exports = {
	joinBruhTest: async (guild) => {
		// Goal: Playing audio over voice
		// Define connection
		const guildChannels = await guild.channels.fetch();
		const guildAFKChannel = guild.afkChannel;
		const guildVoiceChannels = guildChannels.filter((v) => v.isVoice() && v.joinable && v !== guildAFKChannel);

		// Connect to a voice channel
		const connection = joinVoiceChannel({
			channelId: guildVoiceChannels.at(1).id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
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
		player.on(AudioPlayerStatus.Playing, () => {
			console.log(`Haunting ${guild.name}`);
		});

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
			volume: 1,
		});
		// console.log(resource);
		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
		});

		// setTimeout(() => player.play(resource2), 2000);

		// subscription could be undefined if the connection is destroyed!
		if (subscription) {
			// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
			setTimeout(() => subscription.unsubscribe(), 6_000);
			setTimeout(() => {
				try {
					connection.destroy();
				} catch (err) {
					console.error(err);
				}
			}, 20_000);
		}
	},

	hauntSomeChannelWithSoul: async (guild, soulObjToPlay) => {
		// Given a guild and a soul object:
		// -- If the soul object is a global (i.e. default) soul,
		// -- replace it with a soul from that guild's souls
		// -- Then, play the sound in the guild's most active voice channel
		const guildChannels = await guild.channels.fetch();
		const guildAFKChannel = guild.afkChannel;
		const guildVoiceChannels = guildChannels.filter((v) => v.isVoice() && v.joinable && v !== guildAFKChannel);
		if (guildVoiceChannels.size === 0) {
			console.log(`No voice channels to join in ${guild.name}, aborting...`);
			// TODO: notify the server that no voice channels could be joined
			return;
		}

		// Find the VC with the most active users. Arbitrarily break ties -- just join the one first in the list
		let winningIdAndCount = [guildVoiceChannels.at(0).id, guildVoiceChannels.at(0).members.size];
		for (const [voiceChannelId, voiceChannel] of guildVoiceChannels.entries()) {
			// entries() returns a map:
			// key (a string of the channel ID) -> the VoiceChannel object from discordjs
			if (voiceChannel.members.size > winningIdAndCount[1]) {
				winningIdAndCount = [voiceChannelId, voiceChannel.members.size];
			}
		}

		// We know which soul type is meant to play because it's predetermined
		// HOWEVER, when the bot is first setup, it's queued to play the default global sound no matter what bc no other sounds exist.
		// Therefore, we need to check if it is the default global sound about to be played. If so, try to "reroll"
		// Either the condemned still hasn't set a sound, in which case nothing changes,
		// or they did set a sound, and that will, as a guarantee, be played instead. 
		if (soulObjToPlay.global) {
			soulObjToPlay = getWeightedRandomSoulType(guild.id);
		}

		// Actually getting the audio resource, given the soul info, is deferred until the last minute
		// Throws error if the audio resource cannot be located.
		const audioResourceToPlay = getAudioResourceFromSoul(soulObjToPlay, guild.id);

		// Connect to a voice channel
		const connection = await joinVoiceChannel({
			channelId: winningIdAndCount[0],
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
		});

		// Now, the bot is in a random VC and ready to transmit audio

		// Tramsitting audio
		// Create a player instance
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause, // can be configured to either pause, stop, or continue when there are no active subscribers
			},
		});

		// Subscribe the connection to the audio player (will play audio on the voice connection)
		const subscription = connection.subscribe(player);

		console.log(`Haunting ${guild.name}`);

		// Wait to avoid the start of the audio cutting off
		connection.on(VoiceConnectionStatus.Ready, () => {
			player.play(audioResourceToPlay, {
				volume: 1,
			});
		});
		
		player.on('error', error => {
			throw new Error(`Error: ${error.message} with resource ${error.resource.metadata.title}`); // never seen this occur, I assume it's a connection problem thing?
		});

		// Unsubscribe.
		// subscription could be undefined if the connection is destroyed!
		if (subscription) {
			setTimeout(() => subscription.unsubscribe(), 19500);
			setTimeout(() => {
				try {
					connection.destroy();
				} catch (err) {
					console.error(err);
				}
			}, 20000);
		}
	},
};