const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "uptime",
  category: "info",
  description: "Shows Bot's Uptime.",
  usage: "uptime",

  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    
    const up = new MessageEmbed()
    .addField(`Uptime:`, `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
    .setColor("RED")
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`)
    return message.channel.send(up);
  }
  
}