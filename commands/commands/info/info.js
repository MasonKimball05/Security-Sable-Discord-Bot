const Discord = require('discord.js')
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "info",
    description: "sends information on the bot",
    category: "fun",
    aliases: ["i"],
    accessableby: "Members",
    run: async (bot, message, args) => {

        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const embed = new Discord.MessageEmbed()
            .setTitle('Info')
            .setAuthor(message.author.tag)
            .setDescription('```I am a discord bot created by Λrkαn#0066 for the purpose of helping out the Party Animals Server!```')
            .addFields({
                name: 'Coded by:',
                value: '```Λrkαn#0066```',
                inline: true
            }, {
                name: 'Coded Using:',
                value: '```JavaScript: \nDiscord.js (v12.5.3)```',
                inline: true
            }, {
                name: "Uptime:",
                value: `**${days} days \n${hours} hours \n${minutes} minutes \n${seconds} seconds**`,
                inline: true
            })
            .addField('Support Server', '[⚙️ Click Here to Join the Support Server](https://discord.gg/mhNw9SbV3p)', true)
            .setURL('https://discord.gg/mhNw9SbV3p')
            .setTimestamp()
            //.setThumbnail('https://i.imgur.com/k5zZuZO.png')
            .setColor('#ACE5EE')
            .setFooter(`Requested by ${message.author.tag}`, /*'https://i.imgur.com/k5zZuZO.png',*/ );
        message.channel.send(embed)
    }
}