const Discord = require('discord.js')

module.exports = {
    name: "store",
    description: "Check the store!",
    category: "Economy",

    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setDescription("**VIP**\nSilver VIP: 10000 [%buy silver] \nBronze VIP: 3500 [%buy bronze]\n\nFishing Rod: 500 [%buy fishing]")
        .setColor("#FFFFFF")
        message.channel.send(embed)

    }
}