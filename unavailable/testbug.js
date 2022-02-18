const discord = require("discord.js");
module.exports = {
  name: "tsbug",
  category: "unavailable",
  args: true,
  description:
    "Please specify the bug. Example:\n`info isn't working`",
  usage:
    "Please specify the bug. Example:\n`kick isn't working. It isn't kicking the mentioning user I'm trying to kick`",
  run: async (client, message, args) => {

    if(message.author.id != "569681110360129536"){
      const noperms = new MessageEmbed()
      .setDescription("This Command Only Use By My Owner!")
      .setColor("YELLOW");
      return message.channel.send(noperms)
    } 

    args = args.join(" ");
    if(!args[0]) return message.channel.send(`You didn't specify the bug you are encountering`)
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
    message.reply(
      "Thanks for submitting a bug!, we will check your report\nwe will DM you when this bug is resolved\nplease also activate DM permissions all"
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        client.channels.cache.get("937913415018635284").send(
          new discord.MessageEmbed()
            .setTitle("New Report Bug")
            .addField(
              "User Name",
              `**${message.author.username}#${message.author.discriminator}**`
            )
            .addField("ID User", message.author.id)
            .addField("Reported", args)
            .addField("Server Name", `**${message.guild.name}**`)
            .addField("ID Server", `**${message.guild.id}**`)
            .addField("USER SEARCH", `**[Click Here](https://discordapp.com/users/${message.guild.id}/)**`)
            .addField(`Link Server`, `https://discord.gg/${InviteCode.code}`)
            .setColor("RANDOM")
        )
      );
  }
};