const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require ('../models/profileSchema')
const { Client, Collection, Intents } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('join the soul fetchers'),
	async execute(interaction) {
        try {
            let profile = await profileModel.create({
                fetcherTag: interaction.user.tag,
                fetcherID: interaction.user.id,
                serverID: interaction.guildId,
                souls: 0,
                soulcage: 0,
                careersouls: 0
            });
            profile.save();
            await interaction.reply({content: 'FETCH ME THEIR SOULS!', ephemeral: true})
        } catch (error) {
            console.log(error)
            await interaction.reply({content:'What are you doing? You\'re already a soul fetcher! FETCH ME THEIR SOULS!', ephemeral: true})
        }
        }
	};