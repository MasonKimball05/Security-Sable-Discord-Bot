const {
    MessageEmbed
} = require('discord.js')
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: "clear",
    description: "Clears messages from chat",
    category: "moderation",
    accessableby: "Moderators",
    aliases: ["purge", "delete"],
    usage: " <amount>",
    run: async (bot, message, args) => {
        try {
            bot.modlog = `<#${modlog}>`;
            bot.tsmodlog = `<#${tsmodlog}>`

            if (message.deletable) message.delete();
            if (message.partial) await message.fetch();

            if (message.channel.type === "dm") {
                return message.channel.send(`This command can only be used in a server!`)
            } else if (message.channel.type !== "dm") {

                if (!message.member.permissions.has("MANAGE_MESSAGES"))
                    return message.channel.send(`You do not have the correct permissions to do this action, ${message.author.username}`);
                if (!args[0]) {
                    return message.channel.send(`Please enter a amount 1 to 100`)
                }

                let deleteAmount;

                if (parseInt(args[0]) > 100) {
                    deleteAmount = 100;
                } else {
                    deleteAmount = parseInt(args[0]);
                }
                await message.channel.bulkDelete(deleteAmount, true)

                const embed = new MessageEmbed()
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true,
                        format: 'png'
                    }))
                    .setDescription(`Successfully deleted ${deleteAmount} messages`)
                    .setFooter(message.author.username, message.author.displayAvatarURL())
                    .setTimestamp()
                    .setColor('#f2f2f2')
                await message.channel.send(embed)
                bot.channels.cache.get(tsmodlog).send(`${message.author.tag} deleted ${deleteAmount} messages in ${message.channel.name}`)
                return bot.channels.cache.get(modlog).send(`${message.author} deleted ${deleteAmount} messages in ${message.channel}`)
            }
        } catch (e) {
            message.channel.send(`Error: ${e.message}`)
            console.error(e)
        }
    }
}