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

module.exports = {
    name: "kick",
    category: "moderation",
    description: "kicks target member from guild",
    accessableby: "Moderators",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        if (message.partial) await message.fetch();
        bot.modlog = `<#${modlog}>`;

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

            // Can't kick urself
            if (toKick.id === message.author.id) {
                return message.reply("You can't kick yourself...")
            }

            // Check if the user's kickable
            if (!toKick.kickable) {
                return message.reply("I can't kick that person due to role hierarchy, I suppose.")
            }

            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setThumbnail(toKick.user.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(stripIndents `**- Kicked member:** ${toKick} (${toKick.id})
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
                .setAuthor(`This verification becomes invalid after 30s.`)
                .setDescription(`Do you want to kick ${toKick}?`)

            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reaction collector
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                // The verification stuffs
                if (emoji === "✅") {
                    msg.delete();

                    toKick.kick(args.slice(1).join(" "))
                        .catch(err => {
                            if (err) return message.guild.channels.cache.get(modlog).send(`Well.... the kick didn't work out. Here's the error ${err}`)
                            if (!modlog) return message.reply(`Well.... the kick didn't work out. Here's the error ${err}`)
                        });

                    message.guild.channels.cache.get(modlog).send(embed);
                    toKick.send(`you have been kicked from ${message.guild.name} \n\nReason: ${args.slice(1).join(" ")}`)
                } else if (emoji === "❌") {
                    msg.delete()
                        .then(() => {
                            message.guild.channels.cache.get(modlog).send(no);
                            if (!modlog) return message.channel.send(no);
                        })

                    message.reply(`Kick canceled.`)

                }
            });
        }
    }
}