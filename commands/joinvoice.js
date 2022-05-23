const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
    entersState,
    VoiceConnection,
    generateDependencyReport,
	VoiceConnectionStatus
} = require('@discordjs/voice');

//module.exports is how you export data in Node.js so that you can require() it in other files.
//If you need to access your client instance from inside a command file, you can access it via interaction.client.
//If you need to access external files, packages, etc., you should require() them at the top of the file.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinvoice')
		.setDescription('Join and leave a voice channel for test purposes'),
	async execute(interaction) {
		//console.log(interaction);
		// Playing audio over voice
		// define connection
		const guildChannels = await interaction.member.guild.channels.fetch();
		const guildVoiceChannels = guildChannels.filter((v,k,m) => v.type==='GUILD_VOICE');
		guildVoiceChannels.forEach((v,k,m) => console.log(`${v.name}, ${v.id}`));
		//console.log(guildVoiceChannels.at(1));

		//console.log(`${guildVoiceChannels.at(0).id}, ${interaction.guildId}, ${interaction.member.guild.voiceAdapterCreator}`);
		const connection = joinVoiceChannel({
			channelId: guildVoiceChannels.at(0).id,
			guildId: interaction.guildId,
			adapterCreator: interaction.member.guild.voiceAdapterCreator
		});

		// This is how you would access a created connection elsewhere in code without
		// having to track connections yourself. It is best practice to not track the 
		// voice connections yourself. 
		// const connection = getVoiceConnection(myVoiceChannel.guild.id); //where getVoiceConnection comes from discordjs/voice
		// And destroy a voice connection using connection.destroy()

		connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
			console.log('Connection is in the Ready state!');
		});

		// player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
		// 	console.log('Audio player is in the Playing state!');
		// });

		// Subscribe the connection to the audio player (will play audio on the voice connection)
		// const subscription = connection.subscribe(audioPlayer);

		// subscription could be undefined if the connection is destroyed!
		// if (subscription) {
		// 	// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
		// 	setTimeout(() => subscription.unsubscribe(), 5_000);
		// 	setTimeout(() => connection.destroy(), 10_000);
		// }

		setTimeout(() => connection.destroy(), 10_000);
	},
};