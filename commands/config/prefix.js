module.exports = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "config",
    description: "Sets the bot prefix",
    usage: "prefix <new prefix>",
    accessableby: "everyone",
    run: async (bot, message, args) => {
        if(message.author.id != "569681110360129536"){
            return message.reply(`you are not the bot owner you cannot use the command atm!`)
        }
    }
}