const { SlashCommandBuilder } = require('@discordjs/builders');
const { getServerDataFromMemory } = require('../functions/serverData.js');
const { isMemberCondemnedSoul } = require('../functions/privileges.js');
const { getDiscordEmojiNameAndId } = require('../functions/emojis.js');
const fs = require('node:fs');
const https = require('https');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uploadhauntsound').setDescription('Attach a spooky sound.')
		.addAttachmentOption(attachOption => attachOption
			.setName('sound').setDescription('The haunting sound to be played').setRequired(true)),
	async execute(interaction) {
		// Check whether Natebot has already been setup
		const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id.toString());
		if (serverDataObject === null) {
			interaction.reply('The Natebot has not yet been setup on the server.');
			return;
		}
		// Check whether user is the condemned soul
		if (isMemberCondemnedSoul(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be the Condemned Soul to use this command.', ephemeral: true });
			return;
		}

		// Argument 0: an attachment
		// Will verify that it is the correct filetype
		const soundAttachment = interaction.options.getAttachment('sound');
		// console.log(soundAttachment);
		// a MessageAttachment has:
		// { attachment: '<url>', name: 'name.mp3', id: '<id for sth?>', size: 333009, url: '<url>', proxyURL: '<url>', height: null, width: null, contentType: 'audio/ogg', description: null, ephemeral: true }
		// Check file extension
		const fileExtensionRegex = /(?:\.([^.]+))?$/;
		const fileExtension = fileExtensionRegex.exec(soundAttachment.name)[1];
		if (fileExtension !== 'mp3' && fileExtension !== 'ogg') { // In theory it would work for many other filetypes but I haven't checked manually so
			interaction.reply({ content: 'The file must be .mp3 or .ogg for now.', ephemeral: true });
			return;
		}

		// Argument 1: soul name, a string
		// Has a 25 character length limit, but doesn't reject invalid names, just truncates them
		// Replaces illegal filename characters with '-'
		// If a server has a soul with that name already, reject the interaction (verified later)
		// Notice that the name here also becomes the name of the file once downloaded, not the original uploaded filename
		const soulName = interaction.options.getString('soul-name').substring(0, 25).replace(/[/\\?%*:|"<>]/g, '-'); // this regex should make it path safe

		// Argument 2: soul rarity, an integer
		// Must be between 1 and 666
		const soulRarity = interaction.options.getInteger('soul-rarity');
		// Ensure rarity is within bounds
		if (soulRarity < 1 || soulRarity > 666) {
			interaction.reply({ content: 'The soul rarity is too big or too small, please enter a value between 1 and 666', ephemeral: true });
			return;
		}

		// Argument 3: emoji identifier, a string
		// Working with emojis is kind of really annoying: https://thekevinscott.com/emojis-in-javascript/
		// And for Discord emojis: https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md 
		// One thing to know is that unicode emojis are actually two characters that work together
		// and are meaningless (for our purposes) when separated
		// TODO: this (substring from 0,2 ) does not work with certain emojis such as country flags, eg flag_ru becomes R
		let emoji = interaction.options.getString('emoji').trimStart(); // .substring(0, 2);
		// Emojis here may be either custom Discord emojis, which begin with <: or Unicode(?) emojis
		if (emoji.substring(0, 2) === '<:') {
			const [ _emojiName, emojiId ] = getDiscordEmojiNameAndId(emoji);
			try {
				const _customEmoji = await interaction.guild.emojis.fetch(emojiId);
			} catch (err) {
				interaction.reply({ content: 'That emoji is not present on this server. Please choose another emoji.', ephemeral: true });
				return;
			}
		} else {
			emoji = emoji.substring(0, 2); // this has problems for some emojis (see above TODO)
			// eslint-disable-next-line no-misleading-character-class
			const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/; // this should catch most emojis?
			if (!emojiRegex.test(emoji)) {
				interaction.reply({ content: 'You must give a valid emoji for the soul', ephemeral: true });
				return;
			}
		}

		// Get existing information on souls for the server
		if (!fs.existsSync(path.join(__dirname, `../resources/guilds/${interaction.guild.id}`))) {
			console.log('creating folder for server');
			fs.mkdirSync(path.join(__dirname, `../resources/guilds/${interaction.guild.id}`));
		}
		const soulsFilePath = path.join(__dirname, `../resources/guilds/${interaction.guild.id}/souls.json`);
		if (!fs.existsSync(soulsFilePath)) {
			fs.writeFileSync(soulsFilePath, JSON.stringify({ 'souls': [] }));
		}
		let soulsFileContents = 'blank?';
		try {
			soulsFileContents = JSON.parse(fs.readFileSync(soulsFilePath));
		} catch (err) {
			console.log('Error in reading or parsing file: ' + err);
			return;
		}
		// Check for duplicates in name or emoji for the server
		for (const soul of soulsFileContents.souls) {
			if (soulName === soul.name || emoji === soul.emoji) {
				interaction.reply({ content: 'A soul with this emoji or name already exists on the server.', ephemeral: true });
				return;
			}
		}

		// Download the sound effect. It will be stored on Discord's CDN when uploaded to the bot but it cannot be kept there indefinitely
		const soulAudioPath = path.join(__dirname, `../resources/guilds/${interaction.guild.id}/${soulName}.${fileExtension}`);
		const file = fs.createWriteStream(soulAudioPath);
		https.get(soundAttachment.url, (response) => {
			response.pipe(file);
			file.on('finish', () => {
				file.close();
			});
		});

		// Find a unique ID for this soul to refer to it by. This serves two purposes:
		// Names can be duplicated so long as one soul is inactive. In such cases, we need a unique identifier. 
		// The database stores this id to identify which soul is upcoming/previous, rather than the entire soul.
		// Then, the id can be used to lookup the soul in the JSON file using a method (TODO yet to be written).
		const soulIds = [];
		soulsFileContents.souls.forEach(soul => soulIds.push(soul.id));
		let newSoulId = 0;
		while (soulIds.includes(newSoulId)) newSoulId++;

		// Create entry in JSON file and save it.
		soulsFileContents.souls.push({ 'id': newSoulId, 'name': soulName, 'active': true, 'author': interaction.member.id, 'rarity': soulRarity, 'emoji': emoji, 'extension': fileExtension });
		fs.writeFileSync(soulsFilePath, JSON.stringify(soulsFileContents));
		interaction.reply({ content: `Congratulations, your soul ${emoji} is ready.`, ephemeral: true });
		// TODO: Trim the sound effect to a valid size, e.g. 60 seconds.
		// mp3-cutter on npm
		// Could also utilize the size value from MessageAttachment, not sure how reliable that is across file formats, etc

		// TODO: Check whether user has already uploaded a sound as the condemned soul.

		// TODO: Prevent any one server from uploading too many sounds

		// TODO: You could do some fun stuff with allowing users to apply effects like reverb, bass boost, etc
		// This will require some kind of audio manipulator integration
		// Tone.js?

	},
};