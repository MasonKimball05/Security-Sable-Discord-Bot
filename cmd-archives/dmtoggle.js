const {
    MessageEmbed
} = require("discord.js");
const Data = require("../../models/toggle")
const token = require("../../token.json")
const mongoose = require("mongoose")
mongoose.connect(token.Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = {
    name: "dmtoggle",
    aliases: ["dmtg"],
    category: "owner",
    description: "toggles dm accessibility",
    usage: "%dmtoggle [true || false]",
    accessableby: "owner",
    //name: balance
    run: async (bot, message, args) => {

        if (message.author.id !== "569681110360129536") return message.reply(`only my owner can use this command!`);

        let toggling = ["enable", "disable"]
        if (!toggling.includes(args[0])) {
            return message.reply("Please provide a valid option! Either **enable** or **disable**!");
        }

        if (args[0] === "enable") {

            Data.findOne({
                dm: args[0]
            }, (err, data) => {
                if (!data){
                const enaberr = new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(`Error enabling \nError: \n\n**${err}**`)
                message.channel.send(enaberr)
                return;
                }

                const enabled = new MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(`DM useage has been enabled!`)
                message.channel.send(enabled)
                return;
            })

        } else if (args[0] === "disable") {

            Data.findOne({
                dm: args[0]
            }, (err, data) => {
                if (!data){
                    if (err){
                    const disaberr = new MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setDescription(`Error disabling \nError: \n\n**${err}**`)
                    message.channel.send(disaberr)
                    return;
                    }
                }

                const disabled = new MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(`DM useage has been disabled!`)
                message.channel.send(disabled)
                return;

            })
        }
    }
}