const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'give-role',
    description: "gives roles to people",
    category: "moderation",
    aliases: ["addrole"],
    accessableby: "Moderators",
    usage: " <@someone> <role name/id>",
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You do not have MANAGE_ROLES permission`)

            if (!args[0] || !args[1]) return message.channel.send("Incorrect usage, It's `<username || user id> <role name || id>")

            try {

                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

                const alreadyHasRole = member._roles.includes(roleName.id);

                if (alreadyHasRole) return message.channel.send(`${member} already has that role`)

                const embed = new MessageEmbed()
                    .setTitle(`Role Name: ${roleName.name}`)
                    .setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}`)
                    .setColor('f3f3f3')
                    .setThumbnail(member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setFooter(new Date().toLocaleString())

                if (!modlog) return message.channel.send(embed)
                message.reply(`${member} has successfully gained the role ${roleName}`)
                if (message.guild.id === "930503589707792435") {
                    return member.roles.add(roleName).then(() => bot.channels.cache.get(tsmodlog).send(embed))
                } else {
                    return member.roles.add(roleName).then(() => bot.channels.cache.get(modlog).send(embed));
                }
            } catch (e) {
                message.channel.send(`Error: ${e.message}`)
                console.error(e)
            }
        }
    }
}