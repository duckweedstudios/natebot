const { MessageButton } = require('discord.js');
const { getTarget } = require('../events/getTarget');
const { increaseValue } = require('../functions/inc');
const { getSoulData } = require('../events/query');
const { isMemberCondemnedSoul } = require('../functions/privileges');

module.exports = {
	name: 'muteButton',
	data: new MessageButton()
		.setCustomId('muteButton')
		.setLabel('Mute 🤬')
		.setStyle('SECONDARY'),
        
	async execute(interaction) {
		const muteDurationSec = 30;
		const soulCost = 1;
		try {
			const target = getTarget(interaction);
			const soulData = await getSoulData(interaction, interaction.user.id);
			// Check that member is CS
			// This check *should* be unnecessary, but...
			if (!isMemberCondemnedSoul(interaction.member, interaction.guild)) {
				console.log(`Warning in muteButton: A member attempted to mute without being CS: ${interaction.member.username} in ${interaction.guild.id}`);
				interaction.reply({ content: 'You must be the Condemned Soul to use this power.', ephemeral: true });
				return;
			}
			// Check that member can afford the mute
			if (soulData.souls <= 1) {
				interaction.reply({ content: 'You do not have enough souls left', ephemeral: true });
				return;
			}
			// Check that the bot has permissions to mute the target
			// Moderatable vs manageable - I think the former is sufficient
			// Check that the target is in voice
			if (!target.voice.channel) { // <- not sure the best way to do this? seems to work
				interaction.reply({ content: 'This user might not be in a voice channel.', ephemeral: true });
				return;
			}
			// Check whether target is already muted
			if (target.voice.serverMute) {
				await interaction.reply({ content: 'This user is already muted', ephemeral: true });
				return;
			}
			if (soulData.souls > 0) {
				increaseValue(interaction, interaction.user, 'souls', -1);
				target.voice.setMute(true);
				setTimeout(() => {
					target.voice.setMute(false);
				}, muteDurationSec * 1000);
				await interaction.reply({ content:`You spent ${soulCost} soul to mute ${target.user.username} for ${muteDurationSec} seconds`, ephemeral: true });
			} else {
				await interaction.reply({ content:`You do not have enough souls left!!`, ephemeral: true });
			}
			
		} catch (err) {
			console.error(err);
		}
	},
};