const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog
module.exports = async (message, client) => {
    client.modlog = `<#${modlog}>`;

    let del = new MessageEmbed()

    .setTitle(`Message Deleted`)
    .setDescription(`A message has been deleted in ${message.channel.id} by ${message.author.username} \n\nContent: \n${message.content}`)
    .setTimestamp()
    .setColor("RED")

    message.guild.channels.cache.get(modlog).send(del)
}