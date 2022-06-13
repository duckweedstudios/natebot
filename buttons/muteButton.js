const { MessageButton } = require('discord.js');
const { getTarget } = require('../events/getTarget');
const { getMutedRoleOnServer } = require('../functions/roles');
const { increaseValue } = require('../events/inc');
const { getSoulData } = require('../events/query');

module.exports = {
	name: 'muteButton',
	data: new MessageButton()
		.setCustomId('muteButton')
		.setLabel('Mute 🤬')
		.setStyle('SECONDARY'),
        
	async execute(interaction) {
		const target = getTarget(interaction);
		const mutedRole = await getMutedRoleOnServer(interaction.guild);
		const member = interaction.guild.members.cache.get(target.id);
		const soulData = getSoulData(interaction, interaction.user.id);
		if (soulData.souls <= 1) {
			await interaction.reply({ content: 'You do not have enough souls left', ephemeral: true });
		} else {
			increaseValue(interaction, interaction.user, 'souls', -1);
			member.roles.add(mutedRole);
			setTimeout(() => {
				member.roles.remove(mutedRole);
			}, 150000);
			await interaction.reply({ content:`You spent 1 soul to mute ${target.username} for 150 seconds`, ephemeral: true });
		}
	},
};