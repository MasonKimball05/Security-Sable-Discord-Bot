const {
  MessageEmbed
} = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
  name: "dm",
  description: "DM a user in the guild",
  category: "fun",
  accessableby: "Moderators",
  run: async (bot, message, args) => {
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
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.reply("That user could not be DMed!"))
        .then(() => message.reply(`Sent a message to ${user.user.tag}`));
      const embed = new MessageEmbed()
        .setTitle("New DM")
        .setDescription(`${message.member} has dm\'d ${user}. **Message**: ${args.slice(1).join(" ")}`)
        .setTimestamp()
        .setColor(user.displayHexColor === '#000000' ? '#ffffff' : user.displayHexColor)
      message.channel.send(embed);
      if (message.guild.id === "930503589707792435") {
        return bot.channels.cache.get(tsmodlog).send(embed)
      } else {
        bot.channels.cache.get(modlog).send(embed)
        if (!modlog) return;
      }
    }
  },
};