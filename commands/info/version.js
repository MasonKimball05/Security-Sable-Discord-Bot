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
            .setDescription(`The current version of the bot is **${version}** \n\n*Note: This command updates as new versions are planned/completed and/or updated to see most previous versions use the command version-history!*`)
            .addFields(
                {
                    name: "Version 1.2.5:",
                    value: "```Add More Public Fun Commands \nSuch as music and economy```",
                    inline: true
                }, {
                    name: "Version 1.5.0",
                    value: "```Unavailable Information```",
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