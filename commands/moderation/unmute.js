const Discord = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
  name: "unmute",
  description: "unmutes target member",
  category: "moderation",
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (message.guild.id === "930503589707792435") return message.reply(`This command is unavailable in this server!`)

      if (message.member.hasPermission('MANAGE_GUILD')) {

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!member) return message.reply('please provide a member to unmute.')

        let mainrole = message.guild.roles.cache.find(r => r.id == "952772076417220628");
        let mute = message.guild.roles.cache.find(r => r.id == "954865201193291796")

        member.roles.add(mainrole)
        member.roles.remove(mute);
        bot.channels.cache.get(modlog).send(`${member.user.tag} has been unmuted by ${message.author.tag}.`)
        if (!modlog) return message.channel.send(`${member.user.tag} has been unmuted.`)

      } else {
        message.reply('you do not have the permissions to do this command!')
      }
    }
  }
}