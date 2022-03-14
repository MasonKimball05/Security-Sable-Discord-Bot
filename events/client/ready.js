const {
  Discord,
  MessageEmbed
} = require("discord.js")
const config = require("../../config.json")
const version = config.version
const upd = `<#938123762405085214>`
module.exports = bot => {
  console.log(`${bot.user.tag} is online`)

  const embed = new MessageEmbed()
    .setTitle(`I have updated to version v${version}`)
    .addField(`Changes`, `**Version**`)
    .addField(`Added Commands`, `**Economy**: \nWork, Daily, Weekly, Balance, Deposit, Withdraw, Leaderboard \n**Utility**:\nVent`)
    .setColor("GREEN")
    .setTimestamp()

  //bot.user.setActivity(`Online at v${version}, listening for %help`, { type: "LISTENING" })
  bot.user.setActivity(`${bot.users.cache.size} users`, { type: "LISTENING" })
  bot.channels.cache.get('931628582713835531').send(`I am online \nVersion: **${version}**\nPrefix: **%** `)
  //bot.channels.cache.get(upd).send(embed)
  if (!'931628582713835531') return;
}