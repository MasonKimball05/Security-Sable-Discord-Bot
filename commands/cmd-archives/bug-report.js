const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js")
const {
  promptMessage
} = require("../funct.js");
module.exports = {
  name: "tsbug-report",
  category: "helpful",
  description: "Report a bug to the bot developer",
  timeout: 10000,
  run: async (bot, message, args) => {

    if (message.author.id !== "569681110360129536") return message.channel.send("Only my owner can use this!");
    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be uesd in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!args.slice(0).join(" ")) {
        message.channel.send('You did not specify your issue please do that, so my developer can fix me')
      } else if (args.slice(0).join(" ")) {
        const reporter = message.author.tag
        const bug = args.slice(0).join(" ")
        const server = message.guild.name
        const invite = message.channel.createInvite({
          unique: true,
          temporary: false
        })
        const supportinv = 'https://discord.gg/vXSNuVA3Um'

        var embed = new MessageEmbed()
          .setDescription('Do you want to report a bug? \nPlease react with ✅ if yes \nPlease react with ❌ if you would like to cancel')
        message.channel.send(embed).then(async msg => {
          const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
          if (emoji === "✅") {
            msg.delete()
            const r = new Discord.MessageEmbed()
              .setTitle('✅ Bug Reported ✅')
              .setDescription(`Thank you ${reporter} for reporting - **${bug}**!`)
              .setTimestamp()
              .setURL(`https://discord.gg/vXSNuVA3Um`)
              .setFooter(`Reported by ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
              }), `you can join the support server [here](${supportinv})`)
            message.channel.send(r)

            const report = new Discord.MessageEmbed()
              .setTitle('Bug Report')
              .setDescription(`Bug: **${bug}** \n\nInvite for ${server}, https://discord.gg/` + invite.code)
              .setTimestamp()
              .setFooter(`This bug was reported by ${reporter} in ${server}`)
              .setColor("BLUE")
            bot.channels.cache.get('937913415018635284').send(report)


          } else if (emoji === "❌") {
            msg.delete()
              .then(() => message.channel.send('❌ Bug Report Canceled ❌'))
          }
        })
      }
    }
  }
}