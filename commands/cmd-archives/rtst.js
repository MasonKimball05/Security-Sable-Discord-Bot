const config = require("../config.json")
const modlog = config.modlog
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "rtst",
    description: "test role assignment",
    category: "Work in Progress",
    accessableby: "owner",
    aliases: ["rt"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in the test server!`)
        } else if (message.channel.type !== "dm") {

            if (message.author.id !== "569681110360129536") return;
            
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You do not have MANAGE_ROLES permission`)


                const member = message.mentions.members.first();
                const roleName = message.guild.roles.cache.find(r => r.id == "932721322344185926") || message.guild.roles.cache.find(r => r.name == "general")
                
                const alreadyHasRole = member._roles.includes(roleName.id);

                if (alreadyHasRole) return message.channel.send(`${member} already has that role`)
                
                const embed = new MessageEmbed()
                    .setTitle(`Role Name: ${roleName}`)
                    .setDescription(`${message.author} has successfully gained the role ${roleName}`)
                    .setColor('GREEN')
                    .setThumbnail(member.user.displayAvatarURL({
                        dynamic: true
                    })) 
                    .setTimestamp()

                    try {

                if (!modlog) return message.channel.send(embed)
                message.reply(`${member} has successfully gained the role ${roleName}`)
                return member.roles.add(roleName).then(() => bot.channels.cache.get(modlog).send(embed));

            } catch (e) {
                return message.channel.send('Error in applying the role.').then(() => console.log(e))
            }
        }
    }
}