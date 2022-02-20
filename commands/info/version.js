const {
    MessageEmbed
} = require("discord.js")
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
            .setTitle(`Bot Version / Future Plans`)
            .setDescription(`The current version of the bot is **${version}** \n\n*Note: This command updates as new versions are planned/completed and/or updated to see all previous versions use the command version-history!*`)
            .addFields(

                /*{                 
                    name: "Version 0.5.8:",
                    value: "```More fun community commands and plans to update the bot to be online almost 24/7```",
                    inline: true
                },
                {
                    name: "Version 0.6.0:",
                    value: "```More non prefix response commands```",
                    inline: true
                }, */
                {
                    name: "Version 0.7.5:",
                    value: "```More fun public commands such as ai chatting and music (maybe)```",
                    inline: true
                }, {
                    name: "Version 0.8.0:",
                    value: "```Open test server to staff members```",
                    inline: true
                },
                 {
                    name: "Version 1.0.0:",
                    value: "```Publicly available on Party Animal Official server(s)```",
                    inline: true
                }, {
                    name: "Version 2.0.0:",
                    value: "```Update bot to discord.js from v12.5.3 to v13.6.0```",
                    inline: true
                }
            )

        message.channel.send(verr)
    }
}