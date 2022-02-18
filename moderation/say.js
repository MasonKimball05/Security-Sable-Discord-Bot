const {
  MessageEmbed
} = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "say",
  description: "Get the bot to say things",
  accessableby: "Moderators",
  category: "moderation",
  run: async (bot, message, args) => {
    message.delete();
    bot.modlog = `<#${modlog}>`;

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You don't have the required permissions to use this command.")

      if (!args[0])
        return message.reply("Nothing to say?")

      if (args[0] === "embed") {
        let user = message.member;
        let chnl = message.channel
        const embed = new MessageEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor);

        message.channel.send(embed);
        message.guild.channels.cache.get(modlog).send(`${user} sent an embed in ${chnl}:`)
          .then(message.guild.channels.cache.get(modlog).send(embed))
      } else {
        let user = message.member;
        let chnel = message.channel;
        message.channel.send(args.join(" "));
        message.guild.channels.cache.get(modlog).send(`${user} sent a message through the bot in ${chnel}: \n${args.join(" ")}`)
      }
    }
  },
};