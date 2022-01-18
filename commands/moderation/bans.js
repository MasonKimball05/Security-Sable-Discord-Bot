const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "bans",
    category: "extra",
    description: "gets info on the server ban numbers",
    accessableby: "moderators",
    run: async (bot, message, args) => {
    if(!message.member.permissions.has('BAN_MEMBERS')) return;
    if (message.partial) await message.fetch();
    let channel = db.fetch(`modlog_${message.guild.id}`)
    if(!channel){
        var user = message.member;
        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} for this server! \n\n*Tip*: If you enable your modlog you'll be able to see moderation actions as they happen!`)
        });
    } else if(channel) {

    var user = message.member;

        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} for this server!`)

            const embed = new MessageEmbed()
            .setTitle('Server Bans')
            .setDescription(`${message.author} requested the number of bans for the server`)
            .setTimestamp()
            .setThumbnail(`${user.user.displayAvatarURL()}`)
            .setFooter(`Requested by ${message.member.displayName}`)

            var sChannel = message.guild.channels.cache.get(channel)
            if(!sChannel) return message.channel.send(embed)
            sChannel.send(embed)
        }) 
    }
    }
}