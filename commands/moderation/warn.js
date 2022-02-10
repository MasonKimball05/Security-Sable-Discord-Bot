const warns = require("../../models/warns");
const {
  MessageEmbed,
  Discord
} = require('discord.js');
const {
  stripIndents
} = require("common-tags");
const {
  promptMessage
} = require("../../funct.js");
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "warn",
  description: "Warn a user",
  category: "moderation",
  usage: "<User mention> <Reason>",
  run: async (bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) return;
    bot.modlog = `<#${modlog}>`;

    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`You did not mention a user!`);
    if (user == message.author) return message.reply(`you cannot warn yourself!`)
    if (!args.slice(1).join(" "))
      return message.channel.send(`You did not specify a reason!`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.guild.channels.cache.get(modlog).send(
            `${user.tag} has been warned with the reason of ${args
              .slice(1)
              .join(" ")}. They now have 1 warn.`
          );
          if (!modlog) return message.channel.send(
            `${user.tag} has been warned with the reason of ${args
            .slice(1)
            .join(" ")}. They now have 1 warn.`);
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.guild.channels.cache.get(modlog).send(
            `${user.tag} has been warned with the reason of ${args
              .slice(1)
              .join(" ")}. They know have ${data.Warns.length} warns.`
          );
          if (data.Warns.length >= 3) {

            const kicked = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(user.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents `**- Kicked member:** ${user} (${user.id})
            **- Kicked by:** ${message.member} (${message.member.id})
            **- Reason:** they had 3+ warns \nReason for last warn ${args.slice(1).join(" ")}`);

            const promptEmbed = new MessageEmbed()
            .setAuthor("This Verification Becomes Invalid After 30s")
            .setColor("GREEN")
            .setDescription(`${user.tag} has 3 warnings would you like for me to kick them?`)

            await message.channel.send(promptEmbed).then(async msg => {
              const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

              if (emoji === "✅") {
                msg.delete();

                user.kick
            }
            })
          }
          if (!modlog) return message.channel.send(
            `${user.tag} has been warned with the reason of ${args
              .slice(1)
              .join(" ")}. They know have ${data.Warns.length} warns.`
          );
        }
      }
    );
  },
};