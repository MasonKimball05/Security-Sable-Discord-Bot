const {
    MessageEmbed,
    Discord
} = require('discord.js');
const {
    stripIndents
} = require("common-tags");
const {
    promptMessage
} = require("../../funct.js");
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: "kick",
    category: "moderation",
    description: "kicks target member from guild",
    accessableby: "Moderators",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        if (message.partial) await message.fetch();
        bot.modlog = `<#${modlog}>`;
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            // No author permissions
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
            }

            // No args
            if (!args[0]) {
                return message.reply("Please provide a person to kick.")
            }

            // No reason
            if (!args[1]) {
                return message.reply("Please provide a reason to kick.")
            }

            // No bot permissions
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")
            }

            const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

            // No member found
            if (!toKick) {
                return message.reply("Couldn't find that member, try again")
            }

            // Can't kick my creator
            if (toKick.id == "569681110360129536") {
                return message.reply("Sorry I'm not kicking my creator. Do it yourself!")
            }

            // Can't kick yourself
            if (toKick.id === message.author.id) {
                return message.reply("You can't kick yourself...")
            }

            // Check if the user is kickable
            if (!toKick.kickable) {
                return message.reply("I can't kick that person due to role hierarchy")
            }

            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setThumbnail(toKick.user.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(stripIndents `**- Kicked Member:** ${toKick} (${toKick.id})
            **- Kicked by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

            const no = new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setThumbnail(toKick.user.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setDescription(stripIndents `**- Kick Canceled:** ${toKick} (${toKick.id})
            **- Canceled by:** ${message.member} (${message.member.id})
            **- Initial kick reason:** ${args.slice(1).join(" ")}`);

            const promptEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 60s.`)
                .setDescription(`Do you want to kick ${toKick}?`)

            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reaction collector
                const emoji = await promptMessage(msg, message.author, 60, ["✅", "❌"]);

                // The verification stuffs
                if (emoji === "✅") {
                    msg.delete();

                    toKick.kick(args.slice(1).join(" "))
                        .catch(err => {
                            if (message.guild.id === "930503589707792435") {
                                if (err) return bot.channels.cache.get(tsmodlog).send(`Error in using the **kick** command: \n${err}`)
                            } else {
                                if (err) return bot.channels.cache.get(modlog).send(`The kick didn't work. Here's the error ${err}`)
                                if (!modlog) return message.reply(`The kick didn't work. Here's the error ${err}`)
                            }
                        });
                    bot.channels.cache.get(modlog).send(embed);
                    toKick.send(`you have been kicked from ${message.guild.name} \n\nReason: ${args.slice(1).join(" ")}`)
                } else if (emoji === "❌") {
                    msg.delete()
                        .then(() => {
                            if (message.guild.id === "930503589707792435") {
                                return bot.channels.cache.get(tsmodlog).send(no)
                            } else {
                                bot.channels.cache.get(modlog).send(no);
                                if (!modlog) return message.channel.send(no);
                            }
                        })

                    message.reply(`Kick canceled.`)
                }
            });
        }
    }
}