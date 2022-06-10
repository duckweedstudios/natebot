const { Client, Intents } = require('discord.js');
const { clientId } = require('../config.json');
const axios = require('axios').default;

module.exports = {
    name: 'getTarget',
    getTarget : (interaction) => {
            const target = interaction.client.usersCurrentTarget[interaction.user.id]
            return target
        }
    }