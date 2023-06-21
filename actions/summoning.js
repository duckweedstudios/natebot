const dayjs = require('dayjs');
const { hauntSomeChannelWithSoul } = require('./hauntings');
const { getWeightedRandomSoulType } = require('../functions/souls');
const { getGuildData } = require('../events/guildquery');
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

const summoningCooldown = dayjs.duration(1, 'minute');
const delayAfterRealHaunting = dayjs.duration(1, 'minute');

module.exports = {
	SummonAttemptResults: {
		Success: 0,
		Cooldown: 1,
		TooSoonAfterRealHaunting: 2,
	},
	attemptSummoning: async (client, guild) => {
		const currentTimestamp = dayjs();
		const guildData = await getGuildData(guild.id);
		if (
			currentTimestamp.diff(guildData.schedule.past.time, 'minutes') <= delayAfterRealHaunting.asMinutes()
			&& currentTimestamp.diff(guildData.schedule.past.time, 'minutes') >= 0
		) {
			return {
				summonSuccess: module.exports.SummonAttemptResults.TooSoonAfterRealHaunting,
				cooldown: delayAfterRealHaunting.subtract(currentTimestamp.diff(guildData.schedule.past.time, 'minutes'), 'minute').humanize(),
			};
		} else if (
			!client.nateBotData[guild.id].lastSummonTime
			|| currentTimestamp.diff(client.nateBotData[guild.id].lastSummonTime, 'minute') >= summoningCooldown.asMinutes()
		) {
			hauntSomeChannelWithSoul(guild, getWeightedRandomSoulType(guild.id));
			client.nateBotData[guild.id].lastSummonTime = currentTimestamp;
			return {
				summonSuccess: module.exports.SummonAttemptResults.Success,
				cooldown: summoningCooldown.humanize(),
			};
		} else {
			return {
				summonSuccess: module.exports.SummonAttemptResults.Cooldown,
				cooldown: summoningCooldown.subtract(currentTimestamp.diff(client.nateBotData[guild.id].lastSummonTime, 'minute'), 'minute').humanize(),
			};
		}
	},
};