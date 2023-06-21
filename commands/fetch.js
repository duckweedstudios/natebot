const { SlashCommandBuilder } = require('@discordjs/builders');
const { increaseValue } = require('../functions/inc');
const { getGuildData } = require('../events/guildquery.js');
const dayjs = require('dayjs');
const { getSoulById, getSoulValue, getDefaultSoul } = require('../functions/souls');
const { isMemberCondemnedSoulWithGuildQuery } = require('../functions/privileges.js');
const { getDiscordEmojiNameAndId } = require('../functions/emojis.js');
const { getMemory } = require('../functions/serverData.js');
const { isUserSetup, isGuildSetup } = require('../functions/isSetup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('fetches a soul!'),
	async execute(interaction) {
		// TODO: look into caching the DB query results for efficiency
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
			return;
		} else if (!await isUserSetup(interaction, interaction.user.id)) {
			interaction.reply({ content: 'You have not joined the soul fetchers!\n\nTo get started, use /join.', ephemeral: true });
			return;
		} else {
			const currentTimestamp = dayjs();
			let guildData;
			try {
				guildData = await getGuildData(interaction.guild.id);
			} catch (err) {
				// This will most often happen because the server has not been setup yet. 
				console.error(`Error in /fetch: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
				interaction.reply({ content: 'This command failed. The bot was unable to reach our servers', ephemeral: true });
				return;
			}

			// Check if the member is the condemned soul
			if (isMemberCondemnedSoulWithGuildQuery(interaction.member, guildData)) {
				interaction.reply({ content: 'Try as you might, you cannot fetch a soul while you yourself are condemned.', ephemeral: true });
				return;
			}

			if (Math.abs(currentTimestamp.diff(guildData.schedule.past.time, 'second')) < (20 + 1)) {
				if (getMemory(interaction.client, interaction.guild.id).membersWhoFetched.includes(interaction.member.id)) {
					interaction.reply({ content: 'You\'ve already fetched this soul.', ephemeral: true });
					return;
				}
				let soulCaught = getSoulById(guildData.schedule.past.soulTypeId);
				if (soulCaught === -1) soulCaught = getDefaultSoul();
				const soulValue = getSoulValue(soulCaught);
				console.log(soulValue);
				// TODO: check if the user has enough souls to become the condemned soul and the CS is out of souls. If so, notify them in this message.
				let _csSoulsRemaining;
				try {
					// Fetcher Values
					increaseValue(interaction, interaction.user.id, 'souls', soulValue);
					increaseValue(interaction, interaction.user.id, 'soulsCaught', soulValue);
					increaseValue(interaction, interaction.user.id, 'careersouls', soulValue);
					increaseValue(interaction, interaction.user.id, 'soulXP', soulValue);
					increaseValue(interaction, interaction.user.id, 'fetchCount', 1);
					// Condemned Values
					increaseValue(interaction, guildData.condemnedMember, 'souls', -soulValue);
					increaseValue(interaction, guildData.condemnedMember, 'soulsCaught', soulValue);
				} catch (err) {
					console.error(`Error in fetch: could not save to database: ${err}`);
					interaction.reply({ content: 'An error occurred while processing this command (could not update database values).', ephemeral: true });
					return;
				}
				// Track who has already claimed this soul
				getMemory(interaction.client, interaction.guild.id).membersWhoFetched.push(interaction.member.id);
				const emojiId = getDiscordEmojiNameAndId(soulCaught.emoji)[1];
				const soulEmoji = interaction.client.emojis.cache.get(emojiId);
				interaction.reply({ content: `You have fetched a ${soulEmoji} ${soulCaught.name} ${soulEmoji} soul worth ${soulValue} ${soulValue === 1 ? 'soul!' : 'souls!'}`, ephemeral: true });
			} else if (
				getMemory(interaction.client, interaction.guild.id).lastSummonTime
				&& currentTimestamp.diff(getMemory(interaction.client, interaction.guild.id).lastSummonTime, 'second') > 0
				&& currentTimestamp.diff(getMemory(interaction.client, interaction.guild.id).lastSummonTime, 'second') < (20 + 1)
			) {
				// The user was fooled into fetching a summoned soul
				// Increment the counts of times fooled / fooled others
				try {
					increaseValue(interaction, interaction.user.id, 'gotFooledCount', 1);
					increaseValue(interaction, guildData.condemnedMember, 'fooledCount', 1);
				} catch (err) {
					console.error(`Error in fetch: could not save to database: ${err}`);
					interaction.reply({ content: 'An error occurred while processing this command (could not update database values).', ephemeral: true });
					return;
				}
				interaction.reply({ content: 'You were fooled into fetching a summoned soul!', ephemeral: true });
			} else {
				interaction.reply({ content: `There were no souls to be fetched.`, ephemeral: true });
			}
		}
	},
};