const config = require("../../config.json")
const modlog = config.modlog
const { ownerId } = require("../../config.json")
const tsmodlog = config.tsmodlog
const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: 'tsverify',
    category: "utility",
    description: "set your age",
    accessableby: "moderators",
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.author.id !== "569681110360129536") return message.reply('Only my owner can use this!');
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
            if (dob >= 17) {
                bot.channels.cache.get(tsmodlog).send(embed).then(sent => {
                    const ids = sent.id
                    bot.channels.cache.get(tsmodlog).send(`%check ${ids} ${message.author.id} older`)
                })
            } else if (dob <= 17) {
                bot.channels.cache.get(tsmodlog).send(embed).then(sent => {
                    const ids = sent.id
                    bot.channels.cache.get(tsmodlog).send(`%check ${ids} ${message.author.id} younger`)
                })
            }
            } catch (e) {
                console.log(e)
                message.channel.send(`Error! Please contact support!`)
            }
        }
    }
}