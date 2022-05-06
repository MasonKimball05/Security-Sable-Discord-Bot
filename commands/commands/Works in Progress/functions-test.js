const {
    MessageEmbed,
    Discord
} = require("discord.js");
const {
    del
} = require("../../funct")
const {
    tsmodlog,
    ownerId
} = require("../../config.json")
module.exports = {
    name: "funct-test",
    aliases: ["functest"],
    run: async (bot, message, args) => {

        return message.reply(`this command is under construction! There's literally nothing here to send rn!`);
    }
}