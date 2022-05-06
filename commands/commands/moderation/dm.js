const {
  MessageEmbed,
  MessageReaction
} = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
const {
  promptMessage
} = require("../../funct")
module.exports = {
  name: "dm",
  description: "DM a user in the guild",
  category: "fun",
  accessableby: "Moderators",
  usage: " <@someone> <message>",
  run: async (bot, message, args) => {
    try {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.reply("You do not have enough permissions!");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;
      if (!user)
        return message.reply(
          `You did not mention a user, or you gave an invalid id`
        );
      if (!args.slice(1).join(" "))
        return message.reply("You did not specify your message");

      /*
      const promptEmbed = new MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(`You have been sent a message! \nMessage: **${args.slice(1).join(" ")}**`)

      await user.user.send(promptEmbed).then(async msg => { */
      user.user.send(promptEmbed)
        .catch(err => {
          console.error(err)
          message.channel.send(`Error: ${err.message}`)
        })
      const embed = new MessageEmbed()
        .setTitle("New DM")
        .setDescription(`${message.member} has dm\'d ${user}. **Message**: ${args.slice(1).join(" ")}`)
        .setTimestamp()
        .setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
      message.channel.send(embed);
      bot.channels.cache.get(tsmodlog).send(embed)
      return bot.channels.cache.get(modlog).send(embed)
    }
    } catch (err) {
      message.channel.send(`Error: ${err.message}`)
      console.error(err)
    }
  }
};