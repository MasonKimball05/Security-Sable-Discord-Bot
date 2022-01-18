const { MessageEmbed } = require('discord.js');
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
    name: "lock",
    category: "moderation",
    aliases: ["unlock"],
    description: "locks the channel",
    accessableby: "Moderators",

    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return;
        bot.modlog = `<#${modlog}>`;

        let toggeling = ["on", "off"];
        if (!toggeling.includes(args[0])) {
            return message.reply("Please provide a valid option! Either **on** or **off**!");
        }

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                    message.channel.send(`${channel.name} has been locked`)
                    .then(message.guild.channels.cache.get(modlog).send(`${message.author.username} has locked ${channel.name}!`))
                })
            })
            return message.channel.send('locked all channels');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            message.guild.channels.cache.get(modlog).send(`All channels have been unlocked by ${message.author}`)
            return message.channel.send('Unlocked all channels')
        }
    }
}