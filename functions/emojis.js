module.exports = {
	getDiscordEmojiNameAndId: (emojiString) => {
		const emojiIdTemp = emojiString.split(':')[2];
		return [emojiString.split(':')[1], emojiIdTemp.substring(0, emojiIdTemp.length - 1)];
	},
};

// console.log(module.exports.getDiscordEmojiNameAndId('<:okdoit:981272703552077954>'));