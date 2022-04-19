const {
    MessageEmbed,
    Discord
} = require("discord.js");
const {
    del
} = require("../../funct")
module.exports = {
    name: "funct-test",
    aliases: ["functest"],
    run: async (bot, message, args) => {

        const embed = new MessageEmbed()
            .setTitle("TEST EMBED")
            .setDescription("This embed is to test funct.js usage")
            .setFooter("React to 🛑 to prevent this message from being deleted after 30s!")
        await message.channel.send(embed).then(async msg => {
            const dele = await del(message, 30)

            if (dele === "🛑") {
                message.reactions.removeAll()
                message.channel.send(`Embed will not be deleteds`)
            }

        })
    }
}