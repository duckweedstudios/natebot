const { SlashCommandBuilder } = require('@discordjs/builders');
// const { getServerDataFromMemory } = require('../functions/serverData.js');
const { getGuildData } = require('../events/guildquery.js');
const { isMemberPrivileged } = require('../functions/privileges.js');
const { getCondemnedRoleOnServer } = require('../functions/roles.js');

// The NCS command might do what this is doing already. 
// TODO: combine them?

module.exports = {
	data: new SlashCommandBuilder()
		.setName('makecondemned').setDescription('[admin] Force new user as Condemned Soul')
		.addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...').setRequired(true)),
	async execute(interaction) {
		// Check whether Natebot has already been setup
		// const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id);
		// if (serverDataObject === null) {
		// 	interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
		// 	return;
		// }
		let _guildData;
		try {
			_guildData = await getGuildData(interaction.guild.id);
		} catch (err) {
			// This will most often happen because the server has not been setup yet. 
			// console.error(`Error in /makecondemned: Server data could not be retrieved from the database for guild ${interaction.guild.id}: ${err}`);
			interaction.reply({ content: 'This command failed. Most likely, the Natebot has not yet been setup on the server. Use /guildjoin first.', ephemeral: true });
			return;
		}
		// Check for admin status
		if (!isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		// Ensure target isn't a bot
		if (interaction.options.getMember('new-condemned').user.bot) {
			if (interaction.options.getMember('new-condemned').id === '974345779349184542') {
				interaction.reply({ content: 'I am flattered, but I must refuse. Choose a user instead.', ephemeral: true });
				return;
			} else {
				interaction.reply({ content: 'A puny bot cannot bear the mantle of Condemned Soul. Choose a user instead.', ephemeral: true });
				return;
			}
		}
		
		// Erase the condemned role from all who have it
		const condemnedRole = await getCondemnedRoleOnServer(interaction.guild);
		for (const condemnedSoul of condemnedRole.members.entries()) {
			condemnedSoul[1].roles.remove(condemnedRole, 'Condemned role was force removed by an admin');
		}
		// Give the condemned role to the new target and update stored data
		const memberTarget = interaction.options.getMember('new-condemned');
		memberTarget.roles.add(condemnedRole);
		// interaction.client.nateBotData[interaction.guild.id].condemnedMember = memberTarget.id;
		// TODO: Update all the database stuff
		// Use the ncs command/method
		interaction.reply(`<@${memberTarget.id}> is now the Condemned Soul.`);
	},
};