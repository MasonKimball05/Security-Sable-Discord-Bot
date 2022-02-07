const {
  MessageEmbed,
  DiscordAPIError
} = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const db = require("../../db.js")
const {
  promptMessage
} = require("../../funct.js");
const Discord = require('discord.js')

module.exports = {
  name: "announce",
  category: "moderation",
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel id> <msg>",
  timeout: 150000,
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;

    if (message.author.id !== '569681110360129536') {
      return message.reply("You're not the bot the owner!")
    }
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      message.channel.send("You lack the permissions to send this command!")
    }
    if (message.member.permissions.has('MANAGE_GUILD')) {
      if (!args[0]) {
        return message.reply(`you did not specify what channel you want to send the announcement in!`)
      } else if (args[0]) {
        const chn = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        try {

          const filter = msg => msg.author.id == message.author.id;
          const options = {
            max: 1
          };

          const announce = new Discord.MessageEmbed();
          message.channel.send("Reply `skip` or `no` for next question, Reply `cancel` to stop the command.");


          message.channel.send("So, Do you want your announcement to have any title? *Send what you what the title to say if yes don't type yes or cancel!*");
          let title = await message.channel.awaitMessages(filter, options);
          if (title.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (title.first().content !== 'skip' && title.first().content !== 'cancel') announce.setTitle(title.first().content);

          message.channel.send("great, now do you want your embed to have any Description? *Send what you what the description to say if yes don't type yes or cancel!*");
          let Description = await message.channel.awaitMessages(filter, options);
          if (Description.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') announce.setDescription(Description.first().content);

          message.channel.send("So, Do you want your embed to have any Footer? *Send what you what the footer to say if yes don't type yes or cancel*");
          let Footer = await message.channel.awaitMessages(filter, options);
          if (Footer.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel') announce.setFooter(Footer.first().content);

          message.channel.send("So, Do you want your embed to have any specifci color? Default is Black. *Send what you what the color to be if yes don't type yes or cancel*");
          let Color = await message.channel.awaitMessages(filter, options);
          if (Color.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') announce.setColor(Color.first().content.toUpperCase() || "2f3136")

          message.channel.send("So, Do you want your embed to have any Author Field? *Send what you what the author field to say if yes don't type yes or cancel*");
          let Author = await message.channel.awaitMessages(filter, options);
          if (Author.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') announce.setAuthor(Author.first().content);

          message.channel.send("So, Do you want your embed to have any TimeStamp? Reply `yes` or `no`");
          let TimeStamp = await message.channel.awaitMessages(filter, options);
          if (TimeStamp.first().content == 'cancel') return message.channel.send('Announcement Canceled')
          if (TimeStamp.first().content !== 'yes') embed.setTimestamp();

          bot.channels.cache.get(chn.id).send(announce)
          message.guild.channels.cache.get(modlog).send(`${message.author} send an announcement in ${args[0]}`)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}