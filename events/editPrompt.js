const { Client, Intents } = require('discord.js');
const { clientId } = require('../config.json');
const axios = require('axios').default;

module.exports = {
    name: 'editPrompt',
    editPrompt : async (interaction, data) => {
        try{
            // Retrieves Token
            const interactionToken = interaction.client.usersCurrentPrompt[interaction.user.id]
            //Patches Message with Data
             return await axios
                 .patch(`https://discord.com/api/v8/webhooks/${clientId}/${interactionToken}/messages/@original`, data)
        } catch(error) {
            console.log('error')
        }
    }
}