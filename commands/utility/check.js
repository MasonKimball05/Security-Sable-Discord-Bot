const config = require("../../config.json")
const modlog = config.modlog
const older = config["16+_role"]
const young = config["16>_role"]
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'age-check',
    category: "utility",
    description: "set your age",
    accessableby: "Owner",
    aliases: ["check", "check-age", "ack"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;
        bot.older = `<@&${older}>`;
        bot.younger = `<@&${young}>`;

        const member = message.author;


        if (message.author.id !== '569681110360129536') {
            return message.reply("You're not the bot the owner!")
        }

        if (!args[0] || !args[1] || isNaN(args[0]) || isNaN(args[1])) {
            message.reply(`you did not specify a date of birth or the format of your message is incorrect!! Please provide month and year of birth \n\nFormat: mm yyyy`)
        } else if (args[0] && args[1] && !isNaN(args[0]) && !isNaN(args[1])) {

            const age = (Math.floor(2022 - args[1]))

            message.reply(`Your age is ${age}`)

                .then(() => {
                    if (age >= 16) {
                        const embed = new MessageEmbed()
                            .setTitle(`Role Name: ${older.name}`)
                            .setDescription(`${message.author} has successfully given the role ${older} to ${member.user}`)
                            .setColor('f3f3f3')
                            //.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                            .setFooter(new Date().toLocaleString())

                        if (!modlog) return message.channel.send(embed)
                        message.reply(`${member} has successfully gained the role ${older}`)
                        return member.roles.add(older).then(() => message.guild.channels.cache.get(modlog).send(embed));
                    }
                })
        }

    }
}