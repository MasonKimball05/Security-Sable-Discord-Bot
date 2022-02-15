const {
    MessageEmbed
} = require('discord.js');
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
    name: "lock",
    category: "moderation",
    aliases: ["unlock"],
    description: "locks the channel",
    accessableby: "Moderators",
    useage: "%lock <on || off> (optional) <#channel>",

    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return;
        bot.modlog = `<#${modlog}>`;
        const chn = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

        let toggeling = ["on", "off"];
        if (!toggeling.includes(args[0])) {
            return message.reply("Please provide a valid option! Either **on** or **off**!");
        }

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');

        if (!args[1]) {
            if (args[0] === 'on') {
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    }).then(() => {
                        channel.setName(channel.name += `🔒`)
                    })
                })
                message.reply(`has locked all channels!`)
                    .then(message.guild.channels.cache.get(modlog).send(`${message.author.username} has locked all channels!!`))
                return message.channel.send('locked all channels');
            } else if (args[0] === 'off') {
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: true
                    }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    })
                })
                message.guild.channels.cache.get(modlog).send(`All channels have been unlocked by ${message.author}`)
                return message.channel.send('Unlocked all channels')
            }
        } else if (args[1]) {
            if (!chn) {
                return message.reply(`I could not find the channel you mentioned! Please try again`)
            }
            if (args[0] === "on") {
                chn.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    chn.setName(chn.name += `🔒`)
                })
                message.reply(`locked down ${chn}`)
                message.guild.channels.cache.get(modlog).send(`${message.author.username} has locked ${chn}`)

            } else if (args[0] === 'off') {
                chn.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                    chn.setName(chn.name.replace('🔒', ''))
                })
                message.reply(`unlocked ${chn}`)
                bot.channels.cache.get(modlog).send(`${message.author.username} has unlocked ${chn}`)
            }
        }
    }
}