const config = require("../../config.json")
const modlog = config.modlog

const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: 'age-check',
    category: "Work in Progress",
    description: "set your age",
    accessableby: "Owner",
    aliases: ["check", "check-age", "ack"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;

        if (!args[1]) return message.reply(`you did not specify your date of birth! \nPlease provide your date of birth in the format: day year (ex. 01 2000)`)

        if (args[1] == isNaN) return message.reply(`you did not use correct formatting for your date of birth! \nPlease use the format: day year (ex. 01 2000)`)

        if (args[1] !== isNaN && args[1]) {
            const dob = (Math.floor(2022 - args[1]))
            message.reply(`you are ${dob} years old!`)

            const embed = new MessageEmbed()
                .setDescription(`${message.author.username} has verified their age as ${dob} (${args.slice(0).join(" ")})`)
                .setColor("GREEN")
                .setTimestamp()
                .setAuthor(`${message.author.username} age verification`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter("Status: Pending");

            bot.channels.cache.get(modlog).send(embed)
        }
    }
}