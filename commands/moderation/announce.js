const {
  MessageEmbed,
  DiscordAPIError
} = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
const db = require("../../db.js")
const {
  promptMessage
} = require("../../funct.js");
const Discord = require('discord.js')

module.exports = {
  name: "announce",
  category: "moderation",
  description: "Get the bot to send an announcement a specific channel.",
  usage: "<channel id> <msg>",
  timeout: 150000,
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

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

            const preview = new Discord.MessageEmbed()
            .setTimestamp()
            message.channel.send(preview).then(sent => {
              bot.on("message", async message => {
              const pre = await sent.id
              const data = pre.embeds[0]

            const announce = new Discord.MessageEmbed()

            message.channel.send("Reply `skip` or `no` for next question, Reply `cancel` to stop the command.");

            const preview1 = new Discord.MessageEmbed()
            preview1.setDescription("Announcement Preview! \nDo you want your announcement to have any title? *Send what you what the title to say if yes don't type yes or cancel!*")
            pre.edit(preview1);
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const preT = new Discord.MessageEmbed()
            preT.setDescription(`Announcement Preview`)
            if (title.first().content !== 'skip' && title.first().content !== 'cancel') announce.setTitle(title.first().content).then(preT.setTitle(title.first().content));
            pre.edit(preT)
      
            const preview2 = new Discord.MessageEmbed()
            preview2.setTitle(data.title)
            preview2.setDescription(`Announacement Preview \nDo you want your embed to have a footer? *Send what you want the footer to say*`)
            pre.edit(preview2);

            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const preF = new Discord.MessageEmbed()
              preF.setTitle(data.title)
              preF.setDescription(`Announcement Preview`)
              if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel') announce.setFooter(Footer.first().content).then(preF.setFooter(Footer.first().content));
              pre.edit(preF)

              const preview3 = new Discord.MessageEmbed()
              preview3.setTitle(data.title)
              pewview3.setFooter(data.footer)
              preview3.setDescription(`Announcement Preview \nDo you want your announcement to have a color? Default color is black. *send what color you want the embed to be*`)
            pre.edit(preview3);
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const preC = new Discord.MessageEmbed()
            preC.setTitle(data.title)
            preC.setFooter(data.footer)
            preC.setDescription(`Announcement Preview`)
            if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') announce.setColor(Color.first().content.toUpperCase() || "2f3136").then(preC.setColor(Color.first().content.toUpperCase() || "2f3136"))
            pre.edit(preC)

            const preview4 = new Discord.MessageEmbed()
            preview4.setTitle(data.title)
            preview4.setFooter(data.footer)
            preview4.setColor(data.color)
            preview4.setDescription(`Announcement Preview \nDo you want your embed to have an author field? *send what you want the author field to say*`)
            pre.edit(preview4);
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const preA = new Discord.MessageEmbed()
            preA.setTitle(data.title)
            preA.setFooter(data.footer)
            preA.setColor(data.color)
            preA.setDescription(`Announcement Preview`)
            if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') announce.setAuthor(Author.first().content).then(preA.setAuthor(Author.first().content));
            pre.edit(preA)

            const preview5 = new Discord.MessageEmbed()
            preview5.setTitle(data.title)
            preview5.setFooter(data.footer)
            preview5.setColor(data.color)
            preview5.setAuthor(data.author)
            preview5.setDescription("Announcement Preview \nDo you want your announcement to have a timestamp? *Please reply yes or no*")
            pre.edit(preview5)

            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const prevT = new Discord.MessageEmbed()
            prevT.setTitle(data.title)
            prevT.setFooter(data.footer)
            prevT.setColor(data.color)
            prevT.setAuthor(data.author)
            prevT.setDescription(`Announcement Preview`)
            if (TimeStamp.first().content == 'yes') embed.setTimestamp().then(prevT.setTimestamp());
              pre.edit(prevT)

            const prev2 = new Discord.MessageEmbed()
            prev2.setTitle(data.title)
            prev2.setFooter(data.footer)
            prev2.setColor(data.color)
            prev2.setAuthor(data.author)
            prev2.setDescription("Announcement Preview \nLastly, do you want your embed to have a description? *Send what you what the description to say*")

            pre.edit(prev2);
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('Announcement Canceled')

            const preD = new Discord.MessageEmbed()
            preD.setTitle(data.title)
            preD.setFooter(data.footer)
            preD.setColor(data.color)
            preD.setAuthor(data.author)
            if (TimeStamp.first().content == "yes") preD.setTimestamp()
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') announce.setDescription(Description.first().content).then(preD.setDescription(Description.first().content));
              pre.edit(preD)
              
            .then(bot.channels.cache.get(chn.id).send(announce))
            if (message.guild.id === "930503589707792435") {
              return bot.channels.cache.get(tsmodlog).send(`${message.author} send an announcement in ${args[0]}`)
            } else {
              bot.channels.cache.get(modlog).send(`${message.author} send an announcement in ${args[0]}`)
            }
          })
        })
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  }
}