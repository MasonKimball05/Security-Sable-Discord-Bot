const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "info",
    description: "sends information on the bot",
    category: "fun",
    aliases: ["i"],
    accessableby: "Members", 
    run: async (bot, message, args) => {    

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new Discord.MessageEmbed()
    .setTitle('Info')
    .setAuthor(message.author.tag)
    .setDescription('```I am a discord bot created by Arkan#0066 for the purpose of helping out the Party Animals Server!```')
    .addFields(
     { name: 'Details', value: '```Specifics```' },
     { name: 'Coded by', value: '```Arkan#0066```', inline: true },
     { name: 'Coded in', value: '```JavaScript and Discord.js```', inline: true },
 )
    .addField('Support Server', '[⚙️ Click here to join support server](https://discord.gg/mhNw9SbV3p)', true)
    .setURL('https://discord.gg/mhNw9SbV3p')
    .setTimestamp()
    //.setThumbnail('https://i.imgur.com/k5zZuZO.png')
    .setColor('#ACE5EE')
    .setFooter(`Requested by ${message.author.tag}`, `Uptime: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`, /*'https://i.imgur.com/k5zZuZO.png',*/);
    message.channel.send(embed)
}
}
