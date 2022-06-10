const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { getGuildData } = require('../events/guildquery');

module.exports = {
    getActionRow : async (interaction, target) => {
        if (!target) { 
            target = interaction.user 
        };
        let interactionIdent = interaction.customId
        if (!interactionIdent) {
            interactionIdent = interaction.commandName
        }
        if (interactionIdent === 'myProfileButton') {
            interactionIdent = 'souls'
        }
        const guild = interaction.guild
		let self = false
		let targetIsCondemned = false
		let userIsCondemned = false
		const guildData = await getGuildData(guild.id)
        if (target === interaction.user) { self = true };
		if (guildData.condemnedMember === target.id) { targetIsCondemned = true };
		if (guildData.condemnedMember === interaction.user.id) { userIsCondemned = true };
        let returnedActionRow = new MessageActionRow()
            .addComponents(errorButton.data)
        console.log(interactionIdent)
        switch (interactionIdent) {
            case 'giftModal':
                returnedActionRow = new MessageActionRow()
                .addComponents(confirmButton.data)
                .addComponents(nevermindButton.data)
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
                        .addComponents(helpButton.data)
                        break;
                    } else {
                        returnedActionRow = new MessageActionRow()
                        .addComponents(serverStatsButton.data)
                        .addComponents(helpButton.data)
                        break;
                    }
                } else {
                    if (userIsCondemned) {
                        returnedActionRow = new MessageActionRow()
                        .addComponents(sacrificeButton.data)
                        .addComponents(muteButton.data)
                        .addComponents(voicechatButton.data)
                        .addComponents(serverStatsButton.data)
                        .addComponents(helpButton.data)
                        break;
                    } else if (targetIsCondemned) {
                        returnedActionRow = new MessageActionRow()
                        .addComponents(claimButton.data)
                        .addComponents(serverStatsButton.data)
                        .addComponents(helpButton.data)
                        break;
                    } else {
                        returnedActionRow = new MessageActionRow()
                        .addComponents(giftButton.data)
                        .addComponents(serverStatsButton.data)
                        .addComponents(helpButton.data)
                        break;
                    } 
                }    
            }
            return returnedActionRow
        }
    }

const claimButton = require('../buttons/claimButton')
const cleanseButton = require('../buttons/cleanseButton');
const confirmButton = require('../buttons/confirmButton')
const errorButton = require('../buttons/errorButton')
const giftButton = require('../buttons/giftButton');
const helpButton = require('../buttons/helpButton');
const muteButton = require('../buttons/muteButton');
const myProfileButton  = require('../buttons/myProfileButton')
const nevermindButton = require('../buttons/nevermindButton')
const newSoulButton = require('../buttons/newSoulButton');
const sacrificeButton = require('../buttons/sacrificeButton');
const serverStatsButton = require('../buttons/serverStatsButton');
const summonButton = require('../buttons/summonButton');
const voicechatButton = require('../buttons/voicechatButton');