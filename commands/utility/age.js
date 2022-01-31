const config = require("../../config.json")
const modlog = config.modlog
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'age',
    category: "util",
    description: "set your age",
    accessableby: "Owner",
    aliases: ["setage", "dob"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;

        const member = message.author;

        const spicynsfw = message.guild.roles.cache.find(role => role.name === `16+`);
        const young = `<@&${935370095608360970}>`;

        if (!args[0] || !args[1] || isNaN(args[0]) || isNaN(args[1])) {
            message.reply(`you did not specify a date of birth or the format of your message is incorrect!! Please provide month and year of birth \n\nFormat: mm yyyy`)
        } else if (args[0] && args[1] && !isNaN(args[0]) && !isNaN(args[1])) {

            const age = (Math.floor(2022 - args[1]))

            if (age >= 16) {
                message.reply(`Giving you the 16+ role...`)
                try {

                    const embed = new MessageEmbed()
                        .setTitle(`Role Name: 16+`)
                        .setDescription(`${message.author} has successfully gained the role 16+ `)
                        .setColor('f3f3f3')
                        //.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setFooter(new Date().toLocaleString())

                    if (!modlog) return message.channel.send(embed)
                    .then(() => member.roles.add(spicynsfw).then(() => message.guild.channels.cache.get(modlog).send(embed)))
                    message.reply(`you have successfully gained the role 16+`)

                } catch (e) {
                    return message.channel.send(`There was an error in adding the 16+ role`).then(() => console.log(e))
                }

            } else if (age <= 16) {
                message.reply(`Giving you the >16 role...`)
                try {

                    /*
                    const alreadyHasRole = member._roles.includes(spicynsfw.id);

                    if (alreadyHasRole) return message.channel.send(`${member} already has that role`)
                    */

                    const embed2 = new MessageEmbed()
                        .setTitle(`Role Name: ${young.name}`)
                        .setDescription(`${message.author} has successfully given the role ${young} to ${member.user}`)
                        .setColor('f3f3f3')
                        //   .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                        .setFooter(new Date().toLocaleString())

                    if (!modlog) return message.channel.send(embed)
                    message.reply(`you have successfully gained the role 16>`)
                    return member.roles.add(young).then(() => message.guild.channels.cache.get(modlog).send(embed2))
                } catch (e) {
                    return message.channel.send(`There was an error in adding the 16> role`).then(() => console.log(e))
                }

            }
        }
    }
};