const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
const {
    MessageEmbed
} = require("discord.js")
module.exports = {
    name: "userpurge",
    category: "moderation",
    aliases: ["usp"],
    usage: " <@someone>",
    description: "Purge message from a specific user",
    run: async (client, message, args) => {
        try {
            client.modlog = `<#${modlog}>`
            client.tsmodlog = `<#${tsmodlog}>`

            if (message.channel.type === "dm") {
                return message.channel.send(`This command can only be used in a server!`)
            } else if (message.channel.type !== "dm") {

                if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("you dont have the permissions to use this command")
                let member = message.mentions.members.first()
                let amount = args[1]
                if (!member) return message.channel.send("Please mention a user")
                if (!amount) return message.channel.send("Please provide an amount")
                if (isNaN(amount)) return message.channel.send("Please provide a valid amount to be deleted")
                if (amount > 100) return message.channel.send("100 messages is the limit")

                if (member.id == message.author.id) {
                    message.delete()
                    let AllMessages = await message.channel.messages.fetch()
                    let FilteredMessages = await AllMessages.filter(x => x.author.id === member.id)
                    let deletedMessages = 0
                    FilteredMessages.forEach(msg => {
                        if (deletedMessages >= amount) return
                        msg.delete()
                        deletedMessages++
                    })

                    const embed = new MessageEmbed()
                        .setTitle(`${message.author.username}`)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true,
                            format: 'png'
                        }))
                        .setDescription(`Successfully deleted ${amount} messages`)
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setColor('#f2f2f2')

                    await message.channel.send(embed)
                    client.channels.cache.get(modlog).send(`${message.author} has deleted ${amount} of their own messages from <#${message.channel.id}>`)
                } else if (member.id !== message.author.id) {
                    let AllMessages = await message.channel.messages.fetch()
                    let FilteredMessages = await AllMessages.filter(x => x.author.id === member.id)
                    let deletedMessages = 0
                    FilteredMessages.forEach(msg => {
                        if (deletedMessages >= amount) return
                        msg.delete()
                        deletedMessages++
                    })

                    const embed = new MessageEmbed()
                        .setTitle(`${message.author.username}`)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true,
                            format: 'png'
                        }))
                        .setDescription(`Successfully deleted ${amount} messages`)
                        .setFooter(message.author.username, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setColor('#f2f2f2')

                    await message.channel.send(embed)

                    client.channels.cache.get(tsmodlog).send(`${message.author.username} has deleted $${amount} from ${member.username} in ${message.channel.name}`)
                    return client.channels.cache.get(modlog).send(`${message.author} has deleted ${amount} from ${member} in <#${message.channel.id}>`)
                }
            }
        } catch (e) {
            message.channel.send(`Error: ${e.message}`)
            console.error(e)
        }
    }
}