const {
  MessageEmbed
} = require('discord.js')
const config = require("../../config.json")
const {
  modlog
} = config.modlog
module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "moderation",
  description: "Remove role from any user",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      let target = message.mentions.members.first();

      if (!target) return message.reply(`I am unable to find the user`)

      if (!args[1]) return message.reply(`you did not specify the role you want to remove!`)
      let rrole = message.mentions.roles.first() || message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

      if (!rrole) return message.reply(`I am unable to find the role`)

      let ticon = target.user.avatarURL({
        dynamic: true,
        size: 2048
      });
      let aicon = message.author.avatarURL({
        dynamic: true,
        size: 2048
      });

      const embed = new MessageEmbed()
        .setAuthor(target.user.username, ticon)
        .setThumbnail(target.user.displayAvatarURL({
          dynamic: true
        }))
        .setColor("RANDOM")
        .setDescription(`${rrole} role removed from ${target}`)
        .setFooter(`Role removed by ${message.author.username}`, aicon)
        .setTimestamp()

      await message.channel.send(embed)
      bot.channels.cache.get(modlog).send(embed)

      target.roles.remove(rrole)
    }
  }
}