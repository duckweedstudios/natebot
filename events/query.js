const { Message } = require('discord.js')
const profileModel = require ('../models/profileSchema')
const mongoose = require('mongoose');
const interactionCreate = require('./interactionCreate');

// 
module.exports = { 
    getSoulData : async (userId) => {
    try {
        let soulData = await profileModel.findOne({ fetcherID: userId});
        return soulData
 } catch (err) {
     console.log(err)
     interaction.reply({content: 'There was an error when pulling user information from the database', emphemeral: true})
 }}}