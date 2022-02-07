const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "report",
  category: "moderation",
  description: "Reports a member",
  accessableby: "Moderators",

  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;

      let rMember = message.mentions.members.first();

      if (!rMember)
          return message.reply("Couldn't find that person?")
          
      if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
          return message.channel.send("Can't report that member")

      if (!args[1])
          return message.channel.send("Please provide a reason for the report")
    

      const embed = new MessageEmbed()
          .setColor("#ff0000")
          .setTimestamp()
          .setFooter(message.guild.name, message.guild.iconURL)
          .setAuthor("Reported member", rMember.user.displayAvatarURL)
          .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
          **- Reported by:** ${message.member}
          **- Reported in:** ${message.channel}
          **- Reason:** ${args.slice(1).join(" ")}`);

      return message.guild.channels.cache.get(modlog).send(embed);
  }
}