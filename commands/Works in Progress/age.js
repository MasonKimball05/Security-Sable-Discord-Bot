const config = require("../../config.json")
const modlog = config.modlog
const {
    MessageEmbed
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
      
        const rgx = /^(?:<@!?)?(\d+)>?$/;
    
        const messageID = args[0];
        const replyQuery = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
        const comments = args.slice(2).join(" ")

        const number = new MessageEmbed()
          .setDescription(`❌ | I don't think that was a Message ID!`)
          .setColor("FF2052")
          
        const id = new MessageEmbed()
          .setDescription(`❌ |You forgot to specify Message ID!`)
          .setColor("FF2052")
          
        const query = new MessageEmbed()
          .setDescription(`❌ | You forgot to specify the role to give!`)
          .setColor("FF2052")
          
        const reply = new MessageEmbed()
          .setDescription(`✅ | Successfully Replied the Suggestion.`)
          .setColor("00FFFF")
          
        const noChannel = new MessageEmbed()
          .setDescription(`❌ | No Suggestion Channel found!`)
          .setColor("FF2052")
          
        const noMessage = new MessageEmbed()
          .setDescription(`❌ | Didn't find any Message with that ID!`)
          .setColor("FF2052")

          if (!comments) {

          if(!messageID) return message.channel.send(id);
          
          if (!rgx.test(messageID)) return message.channel.send(number);
          
          if(!replyQuery) return message.channel.send(query)
          
          try{
          const suggestionChannel = client.channels.cache.get(suggest)
          
          if(!suggestionChannel) return message.channel.send(noChannel)
          
          const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {

      return message.channel.send(noMessage);
      })
         
          const data = suggestedEmbed.embeds[0];
         
          const replyEmbed = new MessageEmbed()
          .setAuthor(`${data.author.name}`, data.author.iconURL)
          .setDescription(data.description)
          .setColor("BLUE")
          .addField(`Reply from ${message.author.tag}`, replyQuery)
          .setFooter("Status: Replied")
          .setTimestamp();
          
         suggestedEmbed.edit(replyEmbed)
         
         message.channel.send(reply)
         user.roles.add(replyQuery)
          
          const user = await client.users.cache.find((u) => u.tag === data.author.name)
          
        const embed = new MessageEmbed()
          .setDescription(`You have a reply for your age verification.`)
          .setColor("BLUE")
          .setTimestamp()
          user.send(embed)
            
          } catch(err) {
            return;
        }
    } else if (comments) {
if(!messageID) return message.channel.send(id);
          
          if (!rgx.test(messageID)) return message.channel.send(number);
          
          if(!replyQuery) return message.channel.send(query)
          
          try{
          const suggestionChannel = client.channels.cache.get(suggest)
          
          if(!suggestionChannel) return message.channel.send(noChannel)
          
          const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {

      return message.channel.send(noMessage);
      })
         
          const data = suggestedEmbed.embeds[0];
         
          const replyEmbed = new MessageEmbed()
          .setAuthor(`${data.author.name}`, data.author.iconURL)
          .setDescription(data.description)
          .setColor("BLUE")
          .addField(`Reply from ${message.author.tag}`, replyQuery)
          .setFooter("Status: Replied")
          .setTimestamp();
          
         suggestedEmbed.edit(replyEmbed)
         
         message.channel.send(reply)
         user.roles.add(replyQuery)
          
          const user = await client.users.cache.find((u) => u.tag === data.author.name)
          
        const embed = new MessageEmbed()
          .setDescription(`You have a reply for your age verification. \n Comment: ${comments}`)
          .setColor("BLUE")
          .setTimestamp()
          user.send(embed)
            
          } catch(err) {
            return;
        }
    }
    }
};