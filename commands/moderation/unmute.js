const Discord = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "unmute",
  description: "unmutes target member",
  category: "moderation",
  accessableby: "Moderators",
  run: async (bot, message, args) => {

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (message.member.hasPermission('MANAGE_GUILD')) {
        bot.modlog = `<#${modlog}>`;

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!member) return message.reply('please provide a member to unmute.')

        let mainrole = `<@&${932721322344185926}>`;
        let mute = `<@&${932721354250289172}>`;

        member.roles.add(mainrole)
        member.roles.remove(mute);
        message.guild.channels.cache.get(modlog).send(`${member.user.tag} has been unmuted.`)
        if (!modlog) return message.channel.send(`${member.user.tag} has been unmuted.`)

      } else {
        message.reply('you do not have the permissions to do this command!')
      }
    }
  }
}