const {
    DiscordAPIError,
    MessageEmbed
} = require("discord.js");
const {
    promptMessage
} = require("../../funct.js");

module.exports = {
    name: "edit",
    description: "This command is under testing no public use allowed yet",
    category: "unavailable",
    accessableby: "owner",
    run: async (bot, message, args) => {

        if (message.author.id !== '569681110360129536') {
            return message.reply("You're not the bot the owner! This is a test command! You can't use it!")
        }
    }
}