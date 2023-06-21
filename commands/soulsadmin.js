const { SlashCommandBuilder } = require('@discordjs/builders');
const { isGuildSetup } = require('../functions/isSetup.js');
const { setServerSetting } = require('../functions/set.js');
const { isMemberDev } = require('../functions/privileges.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('soulsadmin')
		.setDescription('server admin')
		.addUserOption(userOption => userOption
			.setName('reset-defaults').setDescription('Reset the server to default settings').setRequired(false))
		.addUserOption(userOption => userOption
			.setName('mean-delay').setDescription('Set the mean delay between haunts in minutes (default 1440 = 1 day)').setRequired(false))
		.addUserOption(userOption => userOption
			.setName('variation').setDescription('Set the variation of the delay between haunts from 1 to 10 (default 6)').setRequired(false)),
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

			let response = '';
			try {
				if (interaction.options.getBoolean('reset-defaults')) {
					setServerSetting(interaction.guild.id, 'meanDelay', 1440);
					setServerSetting(interaction.guild.id, 'variation', 6);
					response = 'Server settings reset to defaults.';
				} else {
					if (interaction.options.getInteger('mean-delay')) {
						if (interaction.options.getInteger('mean-delay') < 2) {
							response += 'Mean delay must be at least 2 minutes.\n';
						} else {
							response += `Mean delay updated to ${interaction.options.getInteger('mean-delay')} minutes.\n}`;
							setServerSetting(interaction.guild.id, 'meanDelay', interaction.options.getInteger('mean-delay'));
						}
					}
					if (interaction.options.getInteger('variation')) {
						if (interaction.options.getInteger('variation') < 1 || interaction.options.getInteger('variation') > 10) {
							response += 'Variation must be between 1 and 10.\n';
						} else {
							response += `Variation updated to ${interaction.options.getInteger('variation')}.\n}`;
							setServerSetting(interaction.guild.id, 'variation', interaction.options.getInteger('variation'));
						}
					}
				}
			} catch (err) {
				console.error(err);
				interaction.reply({ content: 'Something went wrong when updating server settings.', ephemeral: true });
				return;
			}
			interaction.reply({ content: response, ephemeral: true });
			return;
		}
	},
};