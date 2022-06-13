const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchemaGuild');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildjoin')
		.setDescription('ADMIN ONLY'),
	async execute(interaction) {
		try {
			const profile = await profileModel.create({
				serverId: interaction.guild.id,
				condemnedMember: interaction.user.id,
				newSoulMade: false,
				settings: {
					paused: false,
					condemnedRoleId: '984925367070523423',
					channelId: '981563688215523438',
					modRoles: '974364005789487114',
				},
				schedule: {
					next: {
						time: null,
						soulTypeId : null,
					},
					past: {
						time: null,
						soulTypeId : null,
					},
					meanDelay: 1440,
					variaton: 5,
				},
				stats: {
					serverSoulsCaught: 0,
					hauntingsCount: 0,
					soulsCreated: 0,
					lastCondemnedMember: 0,
				},
			});
			profile.save();
			await interaction.reply({ content: 'setup success\nFETCH ME THEIR SOULS!', ephemeral: true });
		} catch (error) {
			console.log(error);
			await interaction.reply({ content:'What are you doing? Your server is already setup!', ephemeral: true });
		}
	},
};