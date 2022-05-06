const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: 'verify',
    category: "utility",
    description: "set your age",
    accessableby: "moderators",
    usage: " <month> <year>",
    aliases: ["setage", "dob", "age"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.guild.id !== "935267292000976926") return message.channel.send(`This commmand is unavailable outside the official server!`)

        if (message.channel.type === "dm") return message.channel.send(`This command can only be used in a server!`)

        if (!args[1]) return message.reply(`you did not specify your date of birth! \nPlease provide your date of birth in the format: day year (ex. 01 2000)`)

        if (args[1] == isNaN) return message.reply(`you did not use correct formatting for your date of birth! \nPlease use the format: day year (ex. 01 2000)`)
        if (args[1] !== isNaN && args[1]) {
            const dob = (Math.floor(2022 - args[1]))
            message.reply("thank you for verifying your age! An admin will review your verification as soon as possible!")
            const embed = new MessageEmbed()
                .setDescription(`**New Age Verification** \n${message.author.username} has verified their age as ${dob} (${args.slice(0).join(" ")}) \n\nSuggested reply command listed below`)
                .setColor("GREEN")
                .setTimestamp()
                .setAuthor(`${message.author.tag}`)
                .addField("Status:", "Pending")
                .setFooter(`${message.author.id}`);

            try {

                if (dob <= 14) {
                    bot.channels.cache.get(modlog).send(embed).then(sent => {
                        const ids = sent.id
                        bot.channels.cache.get(modlog).send(`**Warning**: ${message.author.username} has sent a verification with their age as less than 14 (${args.slice(0).join(" ")})!`)
                    })
                    return;
                }
                if (dob >= 17) {
                    bot.channels.cache.get(modlog).send(embed).then(sent => {
                        const ids = sent.id
                        bot.channels.cache.get(modlog).send(`%check ${ids} ${message.author.id} older`)
                    })
                } else if (dob <= 17) {
                    bot.channels.cache.get(modlog).send(embed).then(sent => {
                        const ids = sent.id
                        bot.channels.cache.get(modlog).send(`%check ${ids} ${message.author.id} younger`)
                    })
                }
            } catch (e) {
                console.log(e)
                message.channel.send(`Error! Please contact support!`)
            }
        }
    }
}