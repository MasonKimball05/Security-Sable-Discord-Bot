const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
const { ownerId } = require("../../config.json")
const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'tscheck',
  category: "utility",
  description: "set your age",
  accessableby: "Owner",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") return message.channel.send(`This command can only be used in a server!`)
    if (message.author.id !== "569681110360129536") return message.reply(`only my owner can use this command!`);
    /*
    //Official Server Role IDs 
    const verified = message.guild.roles.cache.find(r => r.id == "952772076417220628")
    const olderr = message.guild.roles.cache.find(r => r.id == "954864768982863952");
    const youngerr = message.guild.roles.cache.find(r => r.id == "954864449913757808")
    */
    //Test Server Role IDs
    const olderr = message.guild.roles.cache.find(r => r.id == "935370069477826580") || message.guild.roles.cache.find(r => r.name == "16+");
    const youngerr = message.guild.roles.cache.find(r => r.id == "935370095608360970") || message.guild.roles.cache.find(r => r.name == "16>");
    
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`you do not have the permissions to use this command!`);
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply(`I am missing the permissions to use this command! Please contact support!`)

    const messageID = args[0];
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const number = new MessageEmbed()
      .setDescription(`${message.author} that was not a message ID!`)
      .setColor("RED")

    const noID = new MessageEmbed()
      .setDescription(`${message.author} you did not specify the message id you want to reply to`)
      .setColor("RED")

    if (!messageID) return message.channel.send(noID)
    if (!rgx.test(messageID)) return message.channel.send(number);

    const noRole = new MessageEmbed()
      .setDescription(`${message.author} you did not specify the role you want me to give. Please specify if you want me to give the **older** or **younger** role after the message id!`)
      .setColor("RED")

    let arole = ["older", "younger"];
    if (!arole.includes(args[2])) {
      return message.channel.send(noRole)
    }

    if (args[2] === 'older') {

      try {
        const mods = bot.channels.cache.get(tsmodlog)

        const ageEmbed = await mods.messages.fetch(messageID).catch(error => {
          console.log(error)
          return message.channel.send(`I couldn't find the modlog! Please contact support!`)
        })

        const replyo = new MessageEmbed()
          .setDescription(`Successfully replied to and gave the role ${olderr}`)
          .setColor("GREEN")

        const data = ageEmbed.embeds[0]

        const users = await bot.users.cache.find((u) => u.id === data.author.tag)
        const member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()

        /*
        const alreadyHasRole = users._roles.includes(olderr.id);

        if (alreadyHasRole) return message.channel.send(`${member} already has that role`)
        */

        const replyEmbed = new MessageEmbed()
          .setAuthor(`${data.author.name}`)
          .setDescription(data.description)
          //.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setColor("BLUE")
          .addField(`Role given by ${message.author.tag}`, olderr)
          .addField("Status", "Replied")
          .setFooter(`${member.user.name}'s UID: ${member.id}`)
          .setTimestamp();

        const embed = new MessageEmbed()
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(`You have been given an age role: ${olderr.name}`)

        const comp = new MessageEmbed()
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(`${message.author} has given the **${olderr.name}** role to ${data.author.name}`)

        ageEmbed.edit(replyEmbed)
        message.channel.send(replyo).then(() => bot.channels.cache.get(tsmodlog).send(comp))
        return member.roles.add(olderr).then(() => member.send(embed))

      } catch (e) {
        console.log(e)
        message.channel.send(`Error! Please contact support!`)
      }
    } else if (args[2] === 'younger') {
      try {
        const mods = bot.channels.cache.get(tsmodlog)

        const ageEmbed = await mods.messages.fetch(messageID).catch(error => {
          console.log(error)
          return message.channel.send(`I couldn't find the modlog! Please contact support!`)
        })

        const replyy = new MessageEmbed()
          .setDescription(`Successfully replied to and gave the role ${youngerr}`)
          .setColor("GREEN")

        const data = ageEmbed.embeds[0]

        const users = await bot.users.cache.find((u) => u.tag === data.author.tag)
        const member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()

        /*
        const alreadyHasRole = users._roles.includes(youngerr.id);

        if (alreadyHasRole) return message.channel.send(`${member} already has that role`)
        */

        const replyEmbed2 = new MessageEmbed()
          .setAuthor(`${data.author.name}`)
          .setDescription(data.description)
          .setColor("BLUE")
          .addField(`Role given by ${message.author.tag}`, youngerr)
          .addField("Status:", "Replied")
          .setFooter(`${member.user.tag}'s UID: ${member.user.id}`)
          .setTimestamp();

        const embed2 = new MessageEmbed()
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(`You have been given an age role: ${youngerr.name}`)

        const comp2 = new MessageEmbed()
          .setTimestamp()
          .setColor("GREEN")
          .setDescription(`${message.author} has given the ${youngerr.name} role to ${data.author.name}`)

        ageEmbed.edit(replyEmbed2)
        message.channel.send(replyy).then(() => bot.channels.cache.get(tsmodlog).send(comp2))
        return member.roles.add(youngerr).then(() => member.send(embed2))
      } catch (e) {
        console.log(e)
        message.channel.send(`Error! Please contact support!`)
      }
    }
  }
};