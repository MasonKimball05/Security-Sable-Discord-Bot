const config = require("../../config.json")
const modlog = config.modlog
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'tsgro',
    description: "gives roles to people",
    category: "unavailable",
    accessableby: "Moderators",
    run: async (bot, message, args) => {

        bot.modlog = `<#${modlog}>`;

        if(message.author.id != "569681110360129536"){
            const noperms = new MessageEmbed()
            .setDescription("This Command Only Use By My Owner!")
            .setColor("YELLOW");
            return message.channel.send(noperms)
          } 

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You do not have MANAGE_ROLES permission`)

        //if (!args[0] || !args[1]) return message.channel.send("Incorrect usage, It's `<username || user id> <role name || id>")

        try {

            const member = message.author;
            const roleName = message.guild.roles.cache.find(r => r.id === '935370069477826580');

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
            return member.roles.add(roleName).then(() => message.guild.channels.cache.get(modlog).send(embed));

        } catch (e) {
            return message.channel.send('Try to give a role that exists next time...').then(() => console.log(e))
        }
    }
}