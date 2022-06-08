const { SlashCommandBuilder } = require('@discordjs/builders');
const { getServerDataFromMemory } = require('../functions/serverData.js');
const { isMemberPrivileged } = require('../functions/privileges.js');
const { getCondemnedRoleOnServer } = require('../functions/roles.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('makecondemned').setDescription('[admin] Force new user as Condemned Soul')
		.addUserOption(userOption => userOption
			.setName('first-condemned').setDescription('Optionally specify the first Condemned Soul user, otherwise it will be you...').setRequired(true)),
	async execute(interaction) {
		// Check whether Natebot has already been setup
		const serverDataObject = getServerDataFromMemory(interaction.client, interaction.guild.id);
		if (serverDataObject === null) {
			interaction.reply({ content: 'The Natebot has not yet been setup on the server.', ephemeral: true });
			return;
		}
		// Check for admin status
		if (!isMemberPrivileged(interaction.member, interaction.client, interaction.guild)) {
			interaction.reply({ content: 'You must be an admin to use this command!', ephemeral: true });
			return;
		}
		
		// Erase the condemned role from all who have it
		const condemnedRole = await getCondemnedRoleOnServer(interaction.client, interaction.guild);
		for (const condemnedSoul of condemnedRole.members.entries()) {
			condemnedSoul[1].roles.remove(condemnedRole, 'Condemned role was force removed by an admin');
		}
		// Give the condemned role to the new target and update stored data
		const memberTarget = interaction.options.getMember('new-condemned');
		memberTarget.roles.add(condemnedRole);
		interaction.client.nateBotData[interaction.guild.id].condemnedMember = memberTarget.id;
		// TODO: Everything relevant, likely duplicate behavior from setup.js
		// TODO: Insert appropriate user tag/nickname into string below
		interaction.reply(`<@${memberTarget.id}> is now the Condemned Soul.`);
	},
};