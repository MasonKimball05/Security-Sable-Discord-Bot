const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
});
const mongoose = require("mongoose")
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const modlog = config.modlog
const fetch = require('node-fetch')

client.modlog = `<#${modlog}>`;
client.prefix = prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const snipes = new Discord.Collection()
client.events = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
const token = require(`./token.json`);
const message = require("./events/guild/message");
mongoose.connect(token.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
  require("./events/client/ready")(client);
});
client.on("message", async (message) => {
  message.member; //-- GuildMember based
  message.author; //-- User based
  require("./events/guild/message")(client, message);
});
const {
  GiveawaysManager
} = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./handlers/giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});

client.giveawaysManager = manager;

const db = require("./db")
client.on("message", async message => {

  const messageArray = message.content.split(' ');
  const cmd = messageArray[0];
  const args = messageArray.slice(1);
  if (cmd === `%prefixreset`) {
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${message.author} you lack the permissions for this command!`);
    await db.set(`Prefix_${message.guild.id}`, '%');
    message.channel.send(`The prefix for ${message.guild.id} been reset to % `);
  }
  if (cmd === `hello`) {
    message.reply(`hello!`)
  }
  if (cmd === `hi`) {
    message.reply(`hello`)
  }
  if (cmd === `Hello`) {
    message.reply(`hello!`)
  }
})

client.on("message", async (message) => {
  client.on('messageDelete', message => {
    if (message.channel.type === "dm") return;
    if (message.channel.id === `931628582713835531`) return;
    if (message.channel.id === '932489232008769546') return
    snipes.set(message.channel.id, message)

    const LogChannel = client.channels.cache.get(modlog)
    const DeletedLog = new Discord.MessageEmbed()
      .setTitle("Deleted Message")
      .addField('Deleted by', `${message.author} - (${message.author.id})`)
      .addField("In", message.channel)
      .addField('Content', message.content)
      .setColor('RED')
      .setThumbnail(message.author.displayAvatarURL({
        dynamic: true
      }))
    try {
      return LogChannel.send(DeletedLog)
    } catch (error) {
      console.log(' ')
    }
  })
})

client.on("message", async message => {
  client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (message.channel.type === "dm") return;
    if (message.channel.id === '932489232008769546') return
    if (message.channel.id === `931628582713835531`) return;

    const LogChannel = client.channels.cache.get(modlog)
    const EditedLog = new Discord.MessageEmbed()
      .setTitle("Edited Message")
      .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
      .addField("In", oldMessage.channel)
      .addField('Old Message', oldMessage.content)
      .addField('New Message', newMessage.content)
      .setColor('GREEN')
      .setThumbnail(oldMessage.author.displayAvatarURL({
        dynamic: true
      }))
    try {
      return LogChannel.send(EditedLog)
    } catch (e) {
      console.log(' ')
    }
  })
});
/*
client.on("message", async (message) => {
  let aich = client.channels.cache.get('943307314012778566');
  let auth = message.author.id

  if (message.channel === aich) {
    fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${auth}`)
      .then(res => res.json())
      .then(data => {
        message.channel.send(data.response)
      })
  } else if (message.channel !== aich) return;
})

/*
if(message.channel.type === "dm") {
    const dmEmbed = new Discord.MessageEmbed()
    .setTitle('New DM')
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**At:** ${new Date()}\n\n**Content:** \`\`\`${message.content}\`\`\``)
    
    const DMC = client.channels.cache.get('933818731421892608')
    DMC.send(dmEmbed)
} */

/*
const Nuggies = require('nuggies');
Nuggies.handleInteractions(client)
require('discord-buttons')(client);
bot.on('clickMenu', menu => {
    Nuggies.dropclick(client, menu);
});
*/
client.login('SECRET')
