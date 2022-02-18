const Discord = require('discord.js')
const { MessageAttachment, MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = {
    name: "revan",
    description: "sends your info on my creators name sake!",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {   
    const embed = new MessageEmbed()
    .setTitle('Revan')
    .setDescription('"Savior, conqueror, hero, villain. You are all things, Revan… and yet you are nothing. In the end, you belong to neither the light nor the darkness. You will forever stand alone." He is my creator\'s name sake and you can read about him [here](https://starwars.fandom.com/wiki/Revan/Legends)')
    .setThumbnail('https://i.imgur.com/tGUmRmh.jpg')
    .setImage('https://i.imgur.com/tGUmRmh.jpg')
    .setURL(`https://i.imgur.com/tGUmRmh.jpg`)
    message.channel.send(embed)
}
    }
