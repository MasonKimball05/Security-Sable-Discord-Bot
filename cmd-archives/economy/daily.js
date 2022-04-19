const {
    MessageEmbed
} = require("discord.js");
const mongoose = require("mongoose")
const Data = require("../../models/economy")
const token = require("../../token.json")
const ms = require("parse-ms");

mongoose.connect(token.mongoToken, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = {
    name: "daily",
    aliases: ["coins-system"],
    category: "Economy",
    description: "Gives You 200 per day",
    usage: " ",
    accessableby: "everyone",
    //name: daily
    run: async (bot, message, args) => {

        const user = message.author;

        Data.findOne({
            userID: user.id
        }, (err, data) => {
            if (!data) {
                const WarninEmbed = new MessageEmbed()
                    .setColor('#D62828')
                    .setDescription(`${user} has not started yet`)
                message.channel.send(WarninEmbed)
                return;
            }

            if (Math.floor(86400000 - (new Date().getTime() - data.daily) > 0)) { // Millisec
                let time = ms(86400000 - (new Date().getTime() - data.daily));

                const WarningEmbed = new MessageEmbed()
                    .setColor("#89023E")
                    .setDescription(`**${data.name}**, you can claim again in **${time.hours}h, ${time.minutes}m, and ${time.seconds}s**`);
                message.channel.send(WarningEmbed);
                return;
            }
            data.wallet += 100

            data.daily = new Date().getTime();
            data.save().catch(err => console.log(err));

            const moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor("Daily Rewards", message.author.displayAvatarURL())
                .setDescription(`✅ You've collected your daily reward of 100 coins`);
            message.channel.send(moneyEmbed)
            return;
        })
    }
}