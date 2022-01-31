const { MessageEmbed, DiscordAPIError } = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const db = require("../../db.js")
const { promptMessage } = require("../../funct.js");
const Discord = require('discord.js')

module.exports = {
  name: "announce-test",
  description: "This command is under testing no public use allowed yet",
  usage: "<channel id> <msg>",
  accessableby: "Moderators",
  aliases: ["att"],
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    if (message.author.id !== '569681110360129536') {
        return message.reply("You're not the bot the owner! This is a test command! You can't use it!")
    }

    if(!message.member.permissions.has('MANAGE_GUILD')){
        message.channel.send("You lack the permissions to send this command!")
      } else {
      if(message.member.permissions.has('MANAGE_GUILD')){

        const chnel = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This becomes invalid after 30s.`)
        .setDescription(`What channel do you want the announcement to send in?`)

        bot.on("message", async (message) => {
          const filter = m => m.author.id === message.author.id;
        await message.channel.send(chnel).then(async message => {
            message.channel.awaitMessages(filter, {
              max: 1,
              error: ["time"],
              time: 15000
          })
          .then(collected => {
            const chnl = collected.first();
          })

          .then(() => {
              const annou = new MessageEmbed()
              .setColor("GREEN")
              .setAuthor(`This becomes invaild after 30s.`)
              .setDescription(`What do you want the title for the announcement to be?`)

              bot.on("message", async (message) => {
              await message.channel.send(annou).then(async message => {
                  message.channel.awaitMessages(filer, {
                      max: 1,
                      error: ["time"],
                      time: 15000
                  })
                  .then(collected => {
                      const anno = collected();
                  })

                  .then(() => {
                    const messg = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`This becomes invaild after 30s.`)
                    .setDescription(`What do you want the message for the announcement to be?`)

                    bot.on("message", async (message) => {

                    await message.channel.send(messg).then(async message => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            error: ["time"],
                            time: 15000
                        })
                        .then(collected => {
                            const mesg = collected();
                        })

                        const announcement = new MessageEmbed()
                        .setTitle(anno)
                        .setDescription(mesg)
                        .setTimestamp()
                        chnl.send(announcement)
                    })
                  })
                })
            })
            })
            })
          })
        })
      }
    }

  }
}