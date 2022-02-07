const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const suggest = config.suggest

module.exports = {
  name: "suggest",
  category:"suggestion",
  
  run: async (client, message, args) => {
   client.suggest = `<#${suggest}>`
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Please Suggest Something.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`:white_check_mark:  | Your suggestion is Submitted here, <#${suggest}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await client.channels.cache.get(suggest).send(embed)
    
    await msgEmbed.react('👍')
    await msgEmbed.react('👎')
  }
}