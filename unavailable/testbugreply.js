const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const bugr = config.bugr
module.exports = {
  name: "tsbugreply",
  category: "unavailable",
  aliases: ["tsbr"],
  run: async (client, message, args) => {
    
    if(message.author.id != "569681110360129536"){
        const noperms = new MessageEmbed()
        .setDescription("This Command Only Use By My Owner!")
        .setColor("YELLOW");
        return message.channel.send(noperms)
      } 

    client.bugr = `<#${bugr}>`

      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`❌ | I don't think that was a Message ID!`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`❌ | You forgot to specify Message ID!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`❌ | You forgot to specify the Reply!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`✅ | Successfully Replied the Bug.`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`❌ | No Suggestion Channel found!`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Didn't find any Message with that ID!`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = client.channels.cache.get(bugr)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`❌ | Didn't find any Message with that ID!`)
      .setColor("FF2052")
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
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`You have a reply for your Bug Report: \n${replyQuery}`)
      .setColor("BLUE")
      .setTimestamp()
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}