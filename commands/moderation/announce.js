const { MessageEmbed, DiscordAPIError } = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog
const db = require("../../db.js")
const { promptMessage } = require("../../funct.js");
const Discord = require('discord.js')


module.exports = {
  name: "announce",
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel id> <msg>",
  timeout: 150000,
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;

    if(!message.member.permissions.has('MANAGE_GUILD')){
      message.channel.send("You lack the permissions to send this command!")
    }
    if(message.member.permissions.has('MANAGE_GUILD'))


    var enve = new Discord.MessageEmbed()
    .setDescription('What channel would you like to send the announcement in?')
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(enve).then(async message => {
      message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000
    })
    .then(collected => {
      const chnl = collected.first() || message.guild.channels.cache.get(args[0]);
      if (!chnl) return message.channel.send(`You did not specify your channel to send the announcement too!`);
      console.log(chnl);
    })

      const promptEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`This verification becomes invalid after 30s.`)
      .setDescription(`Would you like to set a title for the announcement?`)

  // Send the message
  .then(() => {
    message.channel.send(promptEmbed).then(async msg => {
      // Await the reactions and the reaction collector
      const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
      if (emoji === "✅") {
        msg.delete();
        message.channel.send("What would you like the title of the announcement to be?")

        if (!args[0]) message.reply("you did not specify the title!")

        if (args[0]) {
        const Title = args.slice(0).join(" ")

        .then(() => {
          const NewEmbed = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`This verification becomes invalid after 30s.`)
          .setDescription(`What would you like the announcement to be?`)

          bot.on("message", async (message) => {

          await message.channel.send(NewEmbed).then(async message => {
            message.channel.awaitMessages(filter, {
              max: 1,
              error: ["time"],
              time: 15000
          })
          .then(collected => {
            const MSG = collected();

            const __ = new MessageEmbed()
            .setTitle(`${Title}`)
            .setDescription(`${MSG}`)
            .setColor("RED")
            .setTimestamp();
          chnl.send(__)
      
          })
          })
        })
      })
        } else if (emoji === "❌") {
          const mes = args.slice(0).join(" ")
          if (!mes) message.channel.send(`You did not specify what you want the announcement to be`);

          const _ = new MessageEmbed()
          .setTitle(`Announcement!`)
          .setDescription(`${mes}`)
          .setColor("RANDOM");
        chnl.send(_)

        }

      message.guild.channels.cache.get(modlog).send(`${message.author} sent an announcement in ${chnl} announcement reads as:`)
      .then(message.guild.channels.cache.get(modlog).send(_))
    }
    message.delete();
  })
  })
})
  }
}