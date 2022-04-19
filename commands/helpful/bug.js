const { MessageEmbed, Discord } = require("discord.js");
const {
  promptMessage
} = require("../../funct.js");
module.exports = {
  name: "bug",
  category: "helpful",
  aliases: ["bugreport", "bug-report", "bugs"],
  description: "Please specify the bug. Example:\n`info isn't working`",
  usage: "Please specify the bug. Example:\n`kick isn't working. It isn't kicking the mentioning user I'm trying to kick`",
  run: async (client, message, args) => {

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be uesd in a server!`)
    } else if (message.channel.type !== "dm") {

      const supportinv = 'https://discord.gg/vXSNuVA3Um'
      const reporter = message.author.tag
      const bug = args.slice(0).join(" ")

      if (message.author.id != "569681110360129536") {
        const noperms = new MessageEmbed()
          .setDescription("This Command Only Use By My Owner!")
          .setColor("YELLOW");
        return message.channel.send(noperms)
      }

      args = args.join(" ");
      if (!args[0]) return message.channel.send(`You didn't specify the bug you are encountering`)
      const channels = message.channel;
      let check;
      if (args[0] === "temp") {
        check = "true";
      } else if (args[1] === "temp") {
        check = "true";
      } else {
        check = "false";
      }
      let check2;
      if (args[0] === "temp") {
        check2 = "86400";
      } else if (args[1] === "temp") {
        check2 = "86400";
      } else {
        check2 = "0";
      }
      const embed = new MessageEmbed()
        .setDescription('Do you want to report a bug? \nPlease react with ✅ if yes \nPlease react with ❌ if you would like to cancel')
      message.channel.send(embed).then(async msg => {
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
        if (emoji === "✅") {
          msg.delete()
          const r = new MessageEmbed()
            .setTitle('✅ Bug Reported ✅')
            .setDescription(`Thank you ${reporter} for reporting - **${bug}**!`)
            .setTimestamp()
            .setColor("BLUE")
            .setURL(`https://discord.gg/vXSNuVA3Um`)
            .setFooter(`Reported by ${message.author.tag}`, message.author.displayAvatarURL({
              dynamic: true
            }), `you can join the support server [here](${supportinv})`)
          message.channel.send(r)

          channels
            .createInvite({
              temporary: `${check}`,
              maxAge: `${check2}`,
              maxUses: 0,
              reason: `Requested By : ${message.author.username}`
            })
            .then(InviteCode =>
              client.channels.cache.get("937913415018635284").send(
                new MessageEmbed()
                .setTitle("New Report Bug")
                .addField(
                  "User Name",
                  `**${message.author.username}#${message.author.discriminator}**`
                )
                .addField("ID User", message.author.id)
                .addField("Reported", args)
                .addField("Server Name", `**${message.guild.name}**`)
                .addField("Server ID", `**${message.guild.id}**`)
                .addField("USER SEARCH", `**[Click Here](https://discordapp.com/users/${message.guild.id}/)**`)
                .addField(`Link Server`, `https://discord.gg/${InviteCode.code}`)
                .setColor("BLUE")
              )
            );

        } else if (emoji === "❌") {
          msg.delete()
            .then(() => message.channel.send('❌ Bug Report Canceled ❌'))
        }
      })
    }
  }
};