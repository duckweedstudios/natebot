const { MessageButton } = require('discord.js');
const { getTarget } = require('../events/getTarget');
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
		const member = interaction.guild.members.cache.get(target.id);
		const soulData = getSoulData(interaction, interaction.user.id);
		if (soulData.souls <= 1) {
			await interaction.reply({ content: 'You do not have enough souls left', ephemeral: true });
		} else {
			increaseValue(interaction, interaction.user, 'souls', -1);
			if (member.voice.serverMute) {
				await interaction.reply({ content: 'This user is already Muted', ephemeral: true });
			} else {
				member.voice.setMute(true);
				setTimeout(() => {
					member.voice.setMute(false);
				}, 150000);
				await interaction.reply({ content:`You spent 1 soul to mute ${target.username} for 150 seconds`, ephemeral: true });
			}
		}
	},
};