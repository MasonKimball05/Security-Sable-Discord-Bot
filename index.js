const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
});
const mongoose = require("mongoose")
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const modlog = config.modlog

client.modlog = `<#${modlog}>`;
client.prefix = prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();
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

const db = require("./db")
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

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
  if (cmd === `Hello`) {
    message.reply(`hello!`)
  }
})
/*
client.on("messageDelete", async (message) => {
    require("./events/guild/messageDelete")(message, client);
  });

/*
const Nuggies = require('nuggies');
Nuggies.handleInteractions(client)
require('discord-buttons')(client);
bot.on('clickMenu', menu => {
    Nuggies.dropclick(client, menu);
});
*/
client.login("OTMxNjI2NDU1NDcxODg2Mzg3.YeHKvw.zlysFLjgH17yEDNKPOarEZRnZhU")