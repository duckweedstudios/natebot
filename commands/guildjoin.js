const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchemaGuild');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildjoin')
		.setDescription('ADMIN ONLY'),
	async execute(interaction) {
		try {
			const profile = await profileModel.create({
				serverName: interaction.guild.name,
				serverID: interaction.guildId,
				condemnedMember: '186517957210406912',
				condemnedMemberTag: 'zade0123#3444',
				paused: false,
				setup: false,
				schedule: {
					nextAppearance: null,
					pastAppearance: null,
					meanDelay: -1,
					variation: -1,
				} });
			profile.save();
			await interaction.reply({ content: 'setup success\nFETCH ME THEIR SOULS!', ephemeral: true });
		} catch (error) {
			console.log(error);
			await interaction.reply({ content:'What are you doing? You\'re server is already setup!', ephemeral: true });
		}
	},
};