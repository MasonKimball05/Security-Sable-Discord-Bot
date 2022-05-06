const {
    ownerID,
    modlog
} = require("../../config.json")
const {
    MessageEmbed,
    Discord
} = require("discord.js")
const fs = require("fs")
module.exports = {
    name: "store",
    category: "Works in Progress",
    run: async (bot, message, args) => {
        if (message.author.id !== ownerID) return;

        if (!args[0]) return message.channel.send(`You did not give me a modlog id!`)
        if (args[0] === isNaN) return message.channel.send(`That is not a channel id!`)
        if (!args[1]) return message.channel.send(`You did not give a "reason"`)
        var dict = {
            "modlog": args[0],
            "guild": message.guild.id,
            "Reason": args.slice(1).join(" ")
        };
        var dictstring = JSON.stringify(dict);
        fs.writeFile("./handlers/storage.json", dictstring)
    }
}