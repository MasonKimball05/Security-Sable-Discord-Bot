const {
    MessageEmbed
} = require("discord.js")
const config = require("../../config.json")
const version = config.version

module.exports = {
    name: "version-history",
    description: "sends the bot's current version",
    category: "info",
    accessableby: "Members",
    aliases: ["verhist", "vhis"],
    run: async (bot, message, args) => {
        bot.version = version
        const verr = new MessageEmbed()
            .setTitle(`Bot Version / Plans`)
            .setDescription(`The current version of the bot is ${version}`)
            .addFields({
                    name: "✅ Complete - Version 0.5.0:",
                    value: "```Bot open for open beta testing```",
                    inline: true
                }, {
                    name: "✅ Complete - Version 0.5.8:",
                    value: "```More fun community commands and plans to update the bot to be online almost 24/7```",
                    inline: true
                }, {
                    name: "❌ Canceled - Version 0.6.0:",
                    value: "```More non prefix response commands```",
                    inline: true
                }, {
                    name: "✅ Complete - Version 0.6.5:",
                    value: "```Private Vent Command (Only useable in dms)```",
                    inline: true
                }
                /*
                           {
                               name: "✅ Complete - Version 0.7.5:",
                               value: "```More fun public commands such as ai chatting and music (maybe)```",
                               inline: true
                           },
                           {
                               name: "✅ Complete - Version 1.0.0:",
                               value: "```Publicly available on Party Animal Official server(s)```",
                               inline: true
                           },
                           {
                               name: "✅ Complete - Version 2.0.0:",
                               value: "```Update bot to discord.js from v12.5.3 to v13.6.0```",
                               inline: true
                           } */
            )

        message.channel.send(verr)
    }
}