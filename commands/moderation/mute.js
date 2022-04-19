const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
  name: "mute",
  description: "mutes target member",
  category: "moderation",
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (message.guild.id === "930503589707792435") return message.reply(`This command is unavailable in this server!`)
      if (message.member.hasPermission('MANAGE_GUILD')) {

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!member) return message.reply('please provide a member to mute.')

        let mainrole = message.guild.roles.cache.find(r => r.id == "952772076417220628");
        let mute = message.guild.roles.cache.find(r => r.id == "954865201193291796")

        if (!mute) return message.reply("I couldn't find the 'muted' role.")

        member.roles.remove(mainrole)
        member.roles.add(mute);

        if (message.guild.id === "930503589707792435") {
          return bot.channels.cache.get(tsmodlog).send(`${member.user.tag} has been muted by ${message.author.tag}`)
        } else {
          bot.channels.cache.get(modlog).send(`${member.user.tag} has been muted by ${message.author.tag}!`)
          if (!modlog) return message.reply(`${member.user.tag} has now been muted!`)
        }
      } else {
        message.reply('you do not have the permissions to do this command!')
      }
    }
  }
}