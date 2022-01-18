const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "info",
    description: "sends information on the bot",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {    
    const embed = new Discord.MessageEmbed()
    .setTitle('Info')
    .setAuthor(message.member.displayName)
    .setDescription('```I am a discord bot created by Arkan#0066 for the purpose of helping him and to further challenge his love to program!```')
    .addFields(
     { name: 'Details', value: '```Specifics```' },
     { name: 'Coded by', value: '```Arkan#0066```', inline: true },
     { name: 'Coded in', value: '```JavaScript and Discord.js```', inline: true },
 )
    .addField('Support Server', '[⚙️ Click here to join support server](https://discord.gg/mhNw9SbV3p)', true)
    .setURL('https://discord.gg/mhNw9SbV3p')
    .setTimestamp()
    .setThumbnail('https://i.imgur.com/k5zZuZO.png')
    .setColor('#ACE5EE')
    .setFooter(`Requested by ${message.member.displayName}`, 'https://i.imgur.com/k5zZuZO.png',);
    message.channel.send(embed)
}
}
