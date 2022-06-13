const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMutedRoleOnServer } = require('../functions/roles');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a member as the condemned soul'),
	async execute(interaction) {
		const mutedRole = getMutedRoleOnServer();
		member.roles.add(mutedRole);
		setTimeout(() => {
			member.roles.remove(mutedRole);
		}, 150000);

		for (const channel of interaction.guild.channels.cache.values().filter(chan => chan.isVoice())) {
			if (channel.members.has(member.id)) {
				channel.members.get(member.id).voice.setMute(true);
				break;
			}
		}
	},
};