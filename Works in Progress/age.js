const config = require("../../config.json")
const modlog = config.modlog
const {
    MessageEmbed, Message
} = require('discord.js');

module.exports = {
    name: 'age',
    category: "Work in Progress",
    description: "set your age",
    accessableby: "Owner",
    aliases: ["setage", "dob"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;       


        if(!message.member.hasPermission('MANAGE_GUILD')) return;

        const messageID = args[0];
        const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
        const rgx = /^(?:<@!?)?(\d+)>?$/;

      const number = new MessageEmbed()
      .setDescription(`${message.author} that was not a message ID!`)
      .setColor("RED")

      const noID = new MessageEmbed()
      .setDescription(`${message.author} you did not specify the message id you want to reply to`)
      .setColor("RED")

      const noRole = new MessageEmbed()
      .setDescription(`${message.author} you did not specify the role you want me to give`)
      .setColor("RED")

      const reply = new MessageEmbed()
      .setDescription(`Successfully replied to and gave the role ${roleName}`)
      .setColor("GREEN")

      if(!messageID) return message.channel.send(noID)
      if(!roleName) message.channel.send(noRole)
      if (!rgx.test(messageID)) return message.channel.send(number);

      try {
        const mods = bot.channels.cache.get(modlog)

        const ageEmbed = await mods.messages.fetch(messageID).catch(error => {
          return message.channel.send(`I couldn't find the modlog! Please contact support!`)
        })

        const data = ageEmbed.embeds[0]

        const users = await bot.users.cache.find((u) => u.tag === data.author.name)

        const alreadyHasRole = users._roles.includes(roleName.id);

        if (alreadyHasRole) return message.channel.send(`${member} already has that role`)

        const replyEmbed = new MessageEmbed()
        .setAuthor(`${data.author.name}`)
        .setDescription(data.description)
        //.setThumbnail(data.author.displayAvatarURL({ dynamic: true }))
        .setColor("BLUE")
        .addField(`Role given by ${message.author.tag}`, roleName)
        .setFooter("Status: Replied")
        .setTimestamp();

        ageEmbed.edit(replyEmbed)
        message.channel.send(reply)

        await users.roles.add(roleName).then(() => {

        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("GREEN")
        .setDescription(`You have been given an age role: ${roleName.name}`)
        users.send(embed)
        })
      } catch (e) {
        console.log(e)
      }

    }
};