const {
    MessageEmbed
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
    name: "ban",
    category: "moderation",
    description: "bans target member from guild",
    accessableby: "Moderators",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete();
        if (message.partial) await message.fetch();
        bot.modlog = `<#${modlog}>`;

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
        if (!toBan) return message.channel.send("You did not ping someone to ban!")

        // No member found
        if (!toBan) {
            return message.reply("Couldn't find that member, try again")
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("You can't ban yourself...")
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("I can't ban that person due to role hierarchy, I suppose.")
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents `**- baned member:** ${toBan} (${toBan.id})
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
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.guild.channels.cache.get(modlog).send(`Well.... the ban didn't work out. Here's the error ${err}`)
                        if (!modlog) return message.reply(`Well.... the ban didn't work out. Here's the error ${err}`)

                    });

                message.guild.channels.cache.get(modlog).send(embed);
                if (!modlog) return message.channel.send(embed)
            } else if (emoji === "❌") {
                msg.delete()
                    .then(() => {
                        message.guild.channels.cache.get(modlog).send(no);
                        if (!modlog) return message.channel.send(no);
                    })

                message.reply(`ban canceled.`)
            }
        });

    }
}