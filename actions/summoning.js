const dayjs = require('dayjs');
const { hauntSomeChannelWithSoul } = require('./hauntings');
const { getWeightedRandomSoulType } = require('../functions/souls');
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

const summoningCooldown = dayjs.duration(1, 'minute');

module.exports = {
	attemptSummoning: async (client, guild) => {
		const currentTimestamp = dayjs();
		if (!client.nateBotData[guild.id].lastSummonTime || currentTimestamp.diff(client.nateBotData[guild.id].lastSummonTime, 'minute') >= summoningCooldown.asMinutes()) {
			hauntSomeChannelWithSoul(guild, getWeightedRandomSoulType(guild.id));
			client.nateBotData[guild.id].lastSummonTime = currentTimestamp;
			return { summonSuccess: true, cooldown: summoningCooldown.humanize() };
		} else {
			return { summonSuccess: false, cooldown: summoningCooldown.subtract(currentTimestamp.diff(client.nateBotData[guild.id].lastSummonTime, 'minute'), 'minute').humanize() };
		}
	},
};