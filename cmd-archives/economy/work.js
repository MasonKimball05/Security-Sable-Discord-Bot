const {
    MessageEmbed
} = require("discord.js");
const mongoose = require("mongoose")
const Data = require("../../models/economy")
const token = require("../../token.json")
const ms = require("parse-ms");

mongoose.connect(token.Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const Jwork = require('../../JSON/works.json');
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

module.exports = {
    name: "work",
    aliases: ["wr"],
    category: "Economy",
    description: "Work to Earn Money",
    accessableby: "everyone",
    //name: work
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

            if (Math.floor(1800000 - (new Date().getTime() - data.WorkTimer) > 0)) { // Millisec
                let time = ms(1800000 - (new Date().getTime() - data.WorkTimer));

                const timeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
                message.channel.send(timeEmbed)
                return
            }

            let amount = Math.floor(Math.random() * 50) + 1;
            const embed1 = new MessageEmbed()

                .setColor("GREEN")
                .setDescription(`✅ **${JworkR} $${amount}**`)

            message.channel.send(embed1)
            return;
        })
    }
};