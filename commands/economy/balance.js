const {
    MessageEmbed
} = require("discord.js");
const mongoose = require("mongoose")
const Data = require("../../models/economy")
const config = require("../../config.json")

mongoose.connect(config.mongoToken, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = {
    name: "balance",

    aliases: ["bal"],
    category: "Economy",
    description: "Shows Current Balance",
    usage: "[username | nickname | mention | ID](optional)",
    accessableby: "everyone",
    //name: balance
    run: async (bot, message, args) => {

        const user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                r =>
                r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
            ) ||
            message.guild.members.cache.find(
                r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
            ) ||
            message.member;

        if (user) {
            Data.findOne({
                userID: user.id
            }, (err, data) => {
                if (!data) {

                    const warnEmb = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${user.tag} has not started yet!`)
                        .setTimestamp()
                    message.channel.send(warnEmb)
                    return;
                }

                if (data.bank === null) bank = "0"
                if (data.wallet === null) wallet = "0"
                let net = Math.floor(data.wallet + data.bank)
                const succ = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription()
                    .setAuthor(`${Data.name}'s balance!`)
                    .setDescription(`Net Worth: ${net}\nWallet Balance: **${data.wallet}** \nBank Balance: **${data.bank}**`)

                message.channel.send(succ)
                return;
            })
        }
    }
};