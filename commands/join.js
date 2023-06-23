const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const { isUserSetup, isGuildSetup } = require('../functions/isSetup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join the soul fetchers'),
	async execute(interaction) {
		if (!await isGuildSetup(interaction)) {
			interaction.reply({ content: 'This bot has not been setup yet.\n\nTell an admin to use /guildjoin first!', ephemeral: true });
		} else if (await isUserSetup(interaction, interaction.user.id)) {
			interaction.reply({ content: 'What are you doing? You\'re already a soul fetcher! \n\n**FETCH ME THEIR SOULS!**', ephemeral: true });
		} else {
			try {
				const profile = await profileModel.create({
					fetcherTag: interaction.user.username,
					fetcherID: interaction.user.id,
					serverID:interaction.guild.id,
					souls: 0,
					soulsCaught: 0,
					careerSouls: 0,
					condemnedCount: 0,
					soulXP: 0,
					fetchCount: 0,
					gotFooledCount: 0,
					fooledCount: 0,
					autoLure: false,
				});
				profile.save();
				await interaction.reply({ content: '**FETCH ME THEIR SOULS!**\n\n Use the /souls command to get started', ephemeral: true });
			} catch (error) {
				console.log(`\nThere was an issue creating a new user profile\n${error}`);
				await interaction.reply({ content:'This command failed. There was an error updating the database', ephemeral: true });
			}
		}
	},
};