const { Client, Intents } = require('discord.js');
const { clientId } = require('../config.json');
const axios = require('axios').default;

module.exports = {
    name: 'lastInteraction',
    lastInteraction : async (interaction) => {
        try{
            // Retrieves Token
            const interactionToken = interaction.client.usersCurrentMenuToken[interaction.user.id]
            //Patches Message with Data
             return await axios
                 .get(`https://discord.com/api/v8/webhooks/${clientId}/${interactionToken}/messages/@original`)
        } catch(error) {
            console.log(error)
        }
    }
}