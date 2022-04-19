const {
    MessageEmbed,
    discord
} = require("discord.js")

module.exports = {
    name: "vent",
    description: "Vent to the server privately",
    category: "utility",
    accessability: "Members",
    run: async (bot, message, args) => {
        const vent = args.slice(0).join(" ")
        const chan = `935351238499926056`

        if (message.channel.type !== "dm") {
            return message.channel.send(`This command can only be used in dms for animosity`)
        } else if (message.channel.type === "dm") {

            if (!vent) return message.channel.send(`nothing to say?`)

            const embed = new MessageEmbed()
                .setDescription(vent)
                .setTimestamp()
                .setColor("RED")

                message.channel.send(`Sent!`)
            bot.channels.cache.get(chan).send(embed)
        }
    }
}