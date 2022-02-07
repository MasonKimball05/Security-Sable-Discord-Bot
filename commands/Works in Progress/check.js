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

        const suggestionQuery = args.join(" ");
    if(!suggestionQuery) return message.reply("Please State your date of birth! **Format dd/mm/yyyy**");

    const embed = new MessageEmbed()
         
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${message.author.tag} has submitted a date of birth: \n\n**${suggestionQuery}** \n*If you would like to reply to this message to give an age role please use %age!*`)
    .setColor("00FFFF")
    .setFooter("Status: Pending")
    .setTimestamp();

    bot.channels.cache.get(modlog).send(embed)
    }
}