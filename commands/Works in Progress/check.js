const config = require("../../config.json")
const modlog = config.modlog

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'age-check',
    category: "Work in Progress",
    description: "set your age",
    accessableby: "Owner",
    aliases: ["check", "check-age", "ack"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;

        const old = `<@&935370069477826580>`;
        const young = `<@&935370095608360970>`;


        if (!args[1]) return message.reply(`you did not specify your date of birth! \nPlease provide your date of birth in the format: day year (ex. 01 2000)`)

        if (args[1] == isNaN) return message.reply(`you did not use correct formatting for your date of birth! \nPlease use the format: day year (ex. 01 2000)`)

        try {

            if (args[1] !== isNaN && args[1]) {
                const dob = (Math.floor(2022 - args[1]))
                message.reply(`you are ${dob} years old!`)

                if (dob > 16) {
                    const older = new MessageEmbed()
                        .setDescription(`Giving you the 16+ role!`)
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true,
                            format: "png"
                        }))
                        .setFooter(message.author.username)

                    message.channel.send(older)
                    bot.channels.cache.get(modlog).send(`${message.author} has gained the 16+ role!`)
                    message.author.roles.add(old)
                } else if (dob < 16) {
                    const younger = new MessageEmbed()
                        .setDescription(`Giving you the 16> role!`)
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true,
                            format: "png"
                        }))
                        .setFooter(message.author.username)

                    message.channel.send(younger)
                    bot.channels.cache.get(modlog).send(`${message.author} gained the 16> role!`)
                    message.author.roles.add(young)

                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}