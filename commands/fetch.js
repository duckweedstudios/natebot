const { SlashCommandBuilder } = require('@discordjs/builders');
const testprofileModel = require ('../models/testprofileSchema.js');
const { getGuildData } = require('../events/guildquery.js');
// const profileModelGuild = require('../models/profileSchemaGuild.js');
const dayjs = require('dayjs');
const { getSoulById, getSoulValue, getDefaultSoul } = require('../functions/souls');
const { isMemberCondemnedSoulWithGuildQuery } = require('../functions/privileges.js');
const { getDiscordEmojiNameAndId } = require('../functions/emojis.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('fetches a soul!'),
	async execute(interaction) {
		// TODO: there's a way to cache/optimize this so that it doesn't have to query 
		// the database on each fetch. We could just store the previous appearance to the
		// client object in some way. Depends how laggy this gets in a real use-case
		// This can also incorporate preventing users from duplicate fetching (this part is now implemented)
		let guildData;
		await interaction.deferUpdate();
		try {
			guildData = await getGuildData(interaction.guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			console.error(`Error in /pause: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
			interaction.update({ content: 'This command failed. Most likely, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}

		// Check if the member is the condemned soul
		if (isMemberCondemnedSoulWithGuildQuery(interaction.member, guildData)) {
			interaction.update({ content: 'Try as you might, you cannot fetch a soul while you yourself are condemned.', ephemeral: true });
			return;
		}

		if (Math.abs(dayjs().diff(guildData.schedule.past.time, 'second')) < (20 + 1)) {
			if (interaction.client.nateBotData[interaction.guild.id].membersWhoFetched.includes(interaction.member.id)) {
				interaction.update({ content: 'You\'ve already fetched this soul.', ephemeral: true });
				return;
			}
			let soulCaught = getSoulById(guildData.schedule.past.soulTypeId);
			if (soulCaught === -1) soulCaught = getDefaultSoul();
			const soulValue = getSoulValue(soulCaught);
			// TODO: check if the user has enough souls to become the condemned soul and the CS is out of souls. If so, notify them in this message.
			let _csSoulsRemaining;
			try {
				await testprofileModel.findOneAndUpdate({
					fetcherID: interaction.user.id,
				}, {
					$inc: {
						souls: soulValue,
						soulsCaught: soulValue,
						careersouls: soulValue,
						soulXP: soulValue,
						fetchCount: 1,
					},
				});
				await testprofileModel.findOneAndUpdate({
					fetcherID: guildData.condemnedMember,
				}, {
					$inc: {
						souls: -soulValue,
						soulsCaught: soulValue,
					},
				});
			} catch (err) {
				console.error(`Error in fetch: could not save to database: ${err}`);
				interaction.update({ content: `There was an error updating the database`, ephemeral: true });
				return;
			}
			// Track who has already claimed this soul
			interaction.client.nateBotData[interaction.guild.id].membersWhoFetched.push(interaction.member.id);
			const emojiId = getDiscordEmojiNameAndId(soulCaught.emoji)[1];
			const soulEmoji = interaction.client.emojis.cache.get(emojiId);
			interaction.update({ content: `You have fetched a ${soulEmoji} ${soulCaught.name} ${soulEmoji} soul worth ${soulValue} ${soulValue === 1 ? 'soul!' : 'souls!'}`, ephemeral: true });
		} else {
			interaction.update({ content: `There were no souls to be fetched.`, ephemeral: true });
		}
	},
};