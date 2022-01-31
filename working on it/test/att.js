const { MessageEmbed, DiscordAPIError } = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const db = require("../../db.js")
const { promptMessage } = require("../../funct.js");
const Discord = require('discord.js')

module.exports = {
  name: "announcement-testing-2",
  description: "This command is under testing no public use allowed yet",
  usage: "<channel id> <msg>",
  accessableby: "Moderators",
  aliases: ["atta"],
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    const filter = m => m.author.id === message.author.id;

    if (message.author.id !== '569681110360129536') {
        return message.reply("You're not the bot the owner! This is a test command! You can't use it!")
    }

    if(!message.member.permissions.has('MANAGE_GUILD')){
        message.channel.send("You lack the permissions to send this command!")
      } else {
      if(message.member.permissions.has('MANAGE_GUILD')){
        const chnl = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!chnl) return message.channel.send('Please provide a channel for me to send the announcement in')

        if (args.slice(1).join(" ").split(`|`)) {
            const title = args.slice(1).join(" ").split(`|`)
        } else if (!args.slice(1)) {
        
        if (!args.slice(1).join(" ").split(`|`) && !args.slice(1)){
            const embeded = new MessageEmbed()
            .setDescription('What do you want the announcement message to be?')

            const filter = m => m.author.id === message.author.id;
            await message.channel.send(embeded).then(async message => {
                message.channel.awaitMessages(filter, {
                  max: 1,
                  error: ["time"],
                  time: 15000
              })
              .then(collected => {
                const mesg = collected();
              })
              const nEw = new MessageEmbed()
              .setTitle(`Announcement`)
              .setDescription(mesg)
              .setTimestamp()
              .setColor("RED")
              message.channel.send(nEw)
            })
        } else if (!args.slice(1).join(" ").split(`|`) && args.slice(1).join(" ")) {
            const Embeddd = new MessageEmbed()
            .setDescription('What do you want the announcement message to be?')

            const filter = m => m.author.id === message.author.id;
            await message.channel.send(Embeddd).then(async message => {
                message.channel.awaitMessages(filter, {
                  max: 1,
                  error: ["time"],
                  time: 15000
              })
              .then(collected => {
                const mesgg = collected();
              })
              const newM = new MessageEmbed()
              .setTitle(title)
              .setDescription(mesg)
              .setTimestamp()
              .setColor("RED")
              message.channel.send(newM)
            })
        }
      }
    }
    }
  }
}