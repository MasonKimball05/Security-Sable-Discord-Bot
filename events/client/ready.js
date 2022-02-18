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

  bot.user.setActivity(`Updated to v${version}`)
  bot.channels.cache.get('931628582713835531').send(`I am online at v${version}!`)
  //bot.channels.cache.get(upd).send(embed)
  if (!'931628582713835531') return;
}