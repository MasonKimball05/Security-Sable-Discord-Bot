const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invites",
    category: "owner",
    description: "sends an invite link for the bot",
    accessableby: "owner",
    run: async (bot, message, args) => {
        if (message.author.id !== '530133257707323392') return;

        const emb = new MessageEmbed()
        .setDescription(`Hello my creator! You can invite me with this link [here](https://discord.com/api/oauth2/authorize?client_id=931626455471886387&permissions=8&scope=bot)`)
        .setColor("RED")

        message.channel.send(emb)

    }
}