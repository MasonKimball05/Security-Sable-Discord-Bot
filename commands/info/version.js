const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
const version = config.version

module.exports = {
    name: "version",
    description: "sends the bot's current version",
    category: "info",
    accessableby: "Members",
    aliases: ["ver", "plans", "works-in-progress"],
    run: async (bot, message, args) => {
        bot.version = version

        const verr = new MessageEmbed()
        .setTitle(`Bot Version / Plans`)
        .setDescription(`The current version of the bot is ${version}`)
        .addFields(
            {
                name: "Version 0.5.0:",
                value: "```Bot open for an open beta test```",
                inline: true
            },
            {
                name: "Version 0.5.5:",
                value: "```More non prefix response commands```",
                inline: true
            },
            {
                name: "Version 0.7.0:",
                value: "```More fun public commands such as ai chatting and music (maybe)```",
                inline: true
            },
            {
                name: "Version 1.0.0:",
                value: "```Publicly available on Party Animal Official server(s)```",
                inline: true
            },
            {
                name: "Version 1.5.0:",
                value: "```Update bot to discord.js from v12.5.3 to v13.6.0```",
                inline: true
            }
        )

        message.channel.send(verr)
    }
}