const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { getSoulData } = require('../events/query');
const { getGuildData } = require('../events/guildquery');

module.exports = {
    getEmbed : async (interaction, target) => {
		const guild = interaction.guild
		let self = false
		let targetIsCondemned = false
		let userIsCondemned = false
        const soulData = await getSoulData(target.id)
		const guildData = await getGuildData(guild.id)
        //Determinations
        if (target === interaction.user) { self = true };
		if (guildData.condemnedMember === target.id) { targetIsCondemned = true };
		if (guildData.condemnedMember === interaction.user.id) { userIsCondemned = true };
    
    //Defining Embeds
        //Error Embed
        const errorEmbed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`__***EMBED ERROR***__`)
			.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
			.setDescription('*There was an error when producing this embed*')
			.setThumbnail('https://i.imgur.com/T9HDICa.jpeg')
            .setTimestamp()

        //Condemned Self Embed
        const condemnedSelfEmbed = new MessageEmbed()
		    .setColor('DARK_RED')
		    .setTitle(`__**Your Profile**__`)
		    .setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
		    .setDescription('*THE CONDEMNED SOUL*')
		    .setThumbnail('https://imgur.com/MXLHd9R.png')
		    .addFields(
		    	{ name: '\u200B', value: '\u200B' },
		    	{ name: '__Your Souls Left__', value: `*${soulData.souls}*` },
		    	{ name: '__Spent Souls__', value: `*${(100 - soulData.souls)}*`, inline: true },
		    	{ name: '__Caught Souls__', value: `*${soulData.careersouls}*`, inline: true },
		    	{ name: '\u200B', value: '\u200B' },
		    	{ name: '__**Soul You Created**__', value: `🍌 Banana soul worth 2 souls `}
    	    )
		    .setTimestamp()
		    .setFooter({ text: 'Powered by Parkie LLC'})

        //Condemned Other Embed
        const condemnedOtherEmbed = new MessageEmbed()
        	.setColor('DARK_ORANGE')
        	.setTitle(`__**${target.username}'s profile**__`)
        	.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
        	.setDescription('*Professional Soul Fetcher*')
        	.setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
        	.addFields(
        		{ name: '\u200B', value: '\u200B' },
        		{ name: '__Current Souls Fetched:__', value: `*${soulData.souls}*` },
        		{ name: '__Career Souls:__', value: `*${soulData.careersouls}*` },
        		{ name: '\u200B', value: '\u200B' },
        		{ name: '__**Caught Soul Types:**__', value: `🍓 🥝 🍌 🍇 🍉`}
        	)
        	.setTimestamp()
        	.setFooter({ text: 'Powered by Parkie LLC'});
    
        //Fetcher Self Embed
        const fetcherSelfEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`__**Your Profile**__`)
            .setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
            .setDescription('*Professional Soul Fetcher*')
            .setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '__Current Souls Fetched:__', value: `*${soulData.souls}*` },
                { name: '__Career Souls:__', value: `*${soulData.careersouls}*` },
                { name: '\u200B', value: '\u200B' },
                { name: '__**Caught Soul Types:**__', value: `🍓 🥝 🍌 🍇 🍉`}
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by Parkie LLC'}); 
        
        //Fetcher Other Embed
        const fetcherOtherEmbed = new MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTitle(`__**The profile of ${target.username}**__`)
            .setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
            .setDescription('*Professional Soul Fetcher*')
            .setThumbnail('https://i.imgur.com/rgbM2hX.jpg')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '__Current Souls Fetched:__', value: `*${soulData.souls}*` },
                { name: '__Career Souls:__', value: `*${soulData.careersouls}*` },
                { name: '\u200B', value: '\u200B' },
                { name: '__**Caught Soul Types:**__', value: `🍓 🥝 🍌 🍇 🍉`}
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by Parkie LLC'});
        
        //Fetcher Looking At Condemned Embed
        const fetcherCondemnedEmbed = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle(`__**${target.username}**__`)
            .setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
            .setDescription('*THE CONDEMNED SOUL*')
            .setThumbnail('https://imgur.com/MXLHd9R.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '__Souls Left__', value: `*${soulData.soulcage}*` },
                { name: '__Spent Souls__', value: `*${(100 - soulData.soulcage)}*`, inline: true },
                { name: '__Souls Stolen__', value: `*${soulData.careersouls}*`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: '__**Soul Created**__', value: `🍌 Banana soul worth 2 souls `}
            )
            .setTimestamp()
            .setFooter({ text: 'Powered by Parkie LLC'});
        
        //Outputting the Embed
        try{
            if (self) {
                if (userIsCondemned) {
                    return condemnedSelfEmbed
                } else {
                    return fetcherSelfEmbed
                }
            } else {
                if (userIsCondemned) {
                    return condemnedOtherEmbed
                } else if (targetIsCondemned) {
                    return fetcherCondemnedEmbed
                } else {
                    return fetcherOtherEmbed
                }
            }
        } catch (error) {
            console.log(error) 
            return errorEmbed
        }
    }
}