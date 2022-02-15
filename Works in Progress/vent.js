const { MessageEmbed, discord } = require("discord.js")

module.exports = {
    name: "vent",
    description: "Vent to the server privately",
    category: "work in progress",
    accessability: "Members",
    run: async (bot, message, args) => {
        const vent = args.slice(0).join(" ")
        const chan = `932489232008769546`

        message.delete().then(() => {

        if(!vent) return message.channel.send(`nothing to say?`)

        const embed = new MessageEmbed()
        .setDescription(vent)
        .setTimestamp()

        bot.channels.cache.get(chan).send(embed)
        })
    }
}