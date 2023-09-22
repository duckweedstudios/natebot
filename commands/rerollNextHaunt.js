const { SlashCommandBuilder } = require('@discordjs/builders');
const { isGuildSetup } = require('../functions/isSetup.js');
const { guildHauntDriver } = require('../actions/hauntDrivers.js');
const { isMemberDev } = require('../functions/privileges.js');
const { getGuildData } = require('../events/guildquery.js');
const dayjs = require('dayjs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rerollnexthaunt')
		.setDescription('For admins, re-roll the next scheduled haunting time.'),
	async execute(interaction) {
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
			return;
		} else {
			// Check for admin status (for now only developers have access)
			if (!isMemberDev(interaction.member.id)) {
				interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
				return;
			}

			const guildData = await getGuildData(interaction.guild.id);

			try {
				guildHauntDriver(interaction.client, interaction.guild, false, true);
			} catch (err) {
				console.error(err);
				interaction.reply({ content: 'Something went wrong when re-rolling next haunting time.', ephemeral: true });
				return;
			}
			const response = `✅ The upcoming haunting scheduled for **${dayjs(guildData.schedule.next.time).format('MM/DD/YYYY hh:mm:ss A')}** has been re-rolled.`;
			interaction.reply({ content: response, ephemeral: true });
			return;
		}
	},
};