const {
    MessageEmbed
} = require('discord.js');
const {
    stripIndents
} = require("common-tags");
const {
    promptMessage
} = require("../../funct.js");
const config = require("../../config.json");
const modlog = config.modlog
const tsmodlog = config.tsmodlog

module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans target member from guild",
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
                return message.reply("Please provide a person to ban.")
            }

            // No reason
            if (!args[1]) {
                return message.reply("Please provide a reason to ban.")
            }

            // No bot permissions
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.reply("❌ I do not have permissions to ban members. Please contact a staff member")
            }

            const toBan = message.mentions.members.first() || message.guild.members.get(args[0])

            // No member found
            if (!toBan) {
                return message.reply("Couldn't find that member, try again")
            }

            if (toBan.id == "569681110360129536") {
                return message.reply("Sorry I'm not banning my creator. Do it yourself!")
            }

            // Can't ban urself
            if (toBan.id === message.author.id) {
                return message.reply("You can't ban yourself...")
            }

            // Check if the user's banable
            if (!toBan.bannable) {
                return message.reply("I can't ban that person due to role hierarchy")
            }

            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setThumbnail(toBan.user.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                .setDescription(stripIndents `**- Baned Member:** ${toBan} (${toBan.id})
            **- baned by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

            const no = new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setThumbnail(toBan.user.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setDescription(stripIndents `**- Ban Canceled:** ${toBan} (${toBan.id})
            **- Canceled by:** ${message.member} (${message.member.id})
            **- Initial ban reason:** ${args.slice(1).join(" ")}`);

            const promptEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 60s.`)
                .setDescription(`Do you want to ban ${toBan}?`)

            // Send the message
            await message.channel.send.send(promptEmbed).then(async msg => {
                // Await the reactions and the reactioncollector
                const emoji = await promptMessage(msg, message.author, 60, ["✅", "❌"]);

                // Verification stuffs
                if (emoji === "✅") {
                    msg.delete();

                    toBan.ban(args.slice(1).join(" "))
                        .catch(err => {
                            if (message.guild.id === "930503589707792435") {
                                if (err) return bot.channels.cache.get(tsmodlog).send(`Error in using the **ban** command: \n${err}`)
                            } else {
                                if (err) return bot.channels.cache.get(modlog).send(`Well.... the ban didn't work out. Here's the error ${err}`)
                                if (!modlog) return message.reply(`Well.... the ban didn't work out. Here's the error ${err}`)
                            }
                        });

                    toBan.send(`You have been banned from ${message.guild.name} \n\nReason: **${args.slice(1).join(" ")}`)
                    bot.channels.cache.get(modlog).send(embed);
                    if (!modlog) return message.channel.send(embed)
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

                    message.reply(`ban canceled.`)
                }
            });
        }
    }
}