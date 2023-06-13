const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema');
const { getGuildData } = require('../events/guildquery');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join the soul fetchers'),
	async execute(interaction) {
		const guildData = await getGuildData(interaction);
		if (guildData != null) {
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
			await interaction.reply({ content: "**FETCH ME THEIR SOULS!**\n\n Use the /souls command to get started", ephemeral: true });
			} catch (error) {
				console.log("User attempted to join but was found in the database")
				await interaction.reply({ content:'What are you doing? You\'re already a soul fetcher! FETCH ME THEIR SOULS!', ephemeral: true });
			}
		} else {
			await interaction.reply({ content:'This server is not setup yet!\nTell an admin to use the /guildjoin command to start', ephemeral: true });
		}
	},
};