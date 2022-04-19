const Discord = require('discord.js')
const config = require("../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog

module.exports = {
  name: "channelpoll",
  description: "has the bot send a poll in your channel",
  category: "moderation",
  accessableby: "Members",
  aliases: ["chnlpoll"],
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (message.member.hasPermission("MANAGE_MESSAGES")) {

        let chPollDescription = args.slice(0).join(' ');
        let embedPoll = new Discord.MessageEmbed()
          .setTitle('New Community Poll')
          .setDescription(chPollDescription)
          .setColor('YELLOW')
        let msgEmbed = await message.channel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
      } else {
        message.channel.send('You are missing some permissions to send this command!')
        if (message.guild.id === "930503589707792435") return bot.channels.cache.get(tsmodlog).send(`${message.author.tag} sent a poll in ${message.channel}\n`)
      }
    }
  }
}