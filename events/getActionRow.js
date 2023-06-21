const { MessageActionRow } = require('discord.js');
const { getGuildData } = require('../events/guildquery');
const { getSoulData } = require('../events/query');
const profileModel = require ('../models/profileSchema');

module.exports = {
	getActionRow : async (interaction, target) => {
		if (!target) {
			target = interaction.user;
		}
		let interactionIdent = interaction.customId;
		if (!interactionIdent) {
			interactionIdent = interaction.commandName;
		}
		if (interactionIdent === 'myProfileButton') {
			interactionIdent = 'souls';
		}
		if (interactionIdent === 'backButton') {
			interactionIdent = 'souls';
		}
		console.log(interactionIdent);
		const guild = interaction.guild;
		let self = false;
		let targetIsCondemned = false;
		let userIsCondemned = false;
		const guildData = await getGuildData(guild.id);
		const condemnedData = await getSoulData(interaction, guildData.condemnedMember);
		const userData = await getSoulData(interaction, interaction.user.id);
		const allFetchersData = await profileModel.find({ serverID: interaction.guild.id }).sort({ souls: -1, soulsCaught: -1 });
		if (target === interaction.user) { self = true; }
		if (guildData.condemnedMember === target.id) { targetIsCondemned = true; }
		if (isMemberCondemnedSoulWithGuildQuery(interaction.member, guildData)) { userIsCondemned = true; }
		let returnedActionRow = new MessageActionRow()
			.addComponents(errorButton.data);
		switch (interactionIdent) {
		case 'serverStatsButton':
			returnedActionRow = new MessageActionRow()
				.addComponents(backButton.data)
				.addComponents(helpButton.data);
			break;
		case 'giftModal':
			returnedActionRow = new MessageActionRow()
				.addComponents(confirmButton.data)
				.addComponents(nevermindButton.data);
			break;
		case 'helpButton':
			returnedActionRow = new MessageActionRow()
				.addComponents(myProfileButton.data);
			break;
		case 'souls':
			if (self) {
				if (userIsCondemned) {
					returnedActionRow = new MessageActionRow()
						.addComponents(summonButton.data)
						.addComponents(newSoulButton.data)
						.addComponents(cleanseButton.data)
						.addComponents(serverStatsButton.data)
						.addComponents(helpButton.data);
					break;
				} else {
					returnedActionRow = new MessageActionRow()
						.addComponents(serverStatsButton.data)
						.addComponents(helpButton.data);
					break;
				}
			} else if (userIsCondemned) {
				returnedActionRow = new MessageActionRow()
					.addComponents(sacrificeButton.data)
					.addComponents(muteButton.data)
					.addComponents(voicechatButton.data)
					.addComponents(nicknameButton.data)
					.addComponents(serverStatsButton.data);
				break;
			} else if (targetIsCondemned) {
				if (condemnedData.souls <= 0 && allFetchersData[0].souls === userData.souls) {
					returnedActionRow = new MessageActionRow()
						.addComponents(claimButton.data.setDisabled(false))
						.addComponents(serverStatsButton.data)
						.addComponents(helpButton.data);
				} else {
					returnedActionRow = new MessageActionRow()
						.addComponents(claimButton.data)
						.addComponents(serverStatsButton.data)
						.addComponents(helpButton.data);
				}
				break;
			} else {
				returnedActionRow = new MessageActionRow()
					.addComponents(giftButton.data)
					.addComponents(serverStatsButton.data)
					.addComponents(helpButton.data);
				break;
			}
		}
		return returnedActionRow;
	},
};

const claimButton = require('../buttons/claimButton');
const cleanseButton = require('../buttons/cleanseButton');
const confirmButton = require('../buttons/confirmButton');
const errorButton = require('../buttons/errorButton');
const giftButton = require('../buttons/giftButton');
const backButton = require('../buttons/backButton');
const helpButton = require('../buttons/helpButton');
const muteButton = require('../buttons/muteButton');
const myProfileButton = require('../buttons/myProfileButton');
const nevermindButton = require('../buttons/nevermindButton');
const newSoulButton = require('../buttons/newSoulButton');
const nicknameButton = require('../buttons/nicknameButton');
const sacrificeButton = require('../buttons/sacrificeButton');
const serverStatsButton = require('../buttons/serverStatsButton');
const summonButton = require('../buttons/summonButton');
const voicechatButton = require('../buttons/voicechatButton');
const { isMemberCondemnedSoulWithGuildQuery } = require('../functions/privileges');
