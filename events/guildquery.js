const { Message, CommandInteractionOptionResolver } = require('discord.js')
const profileModelGuild = require ('../models/profileSchemaGuild')
const mongoose = require('mongoose');
const interactionCreate = require('./interactionCreate');

// 
module.exports = { 
    getGuildData : async (tempServerId) => {
    try {
        let guildData = await profileModelGuild.findOne({ serverID: tempServerId});
        return guildData
 } catch (err) {
     console.log(err)
     interaction.reply({content: 'There was an error pulling server information from the database', emphemeral: true})
 }}}