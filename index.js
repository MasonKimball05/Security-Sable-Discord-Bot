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
const BotToken = token.BotToken
client.BotToken = BotToken;
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
  }/*
  if (message.guild.id === "931626981047545946") {
    if (cmd === `hello`) {
      message.reply(`hello!`)
    }
    if (cmd === `hi`) {
      message.reply(`hello`)
    }
    if (cmd === `Hello`) {
      message.reply(`hello!`)
    }
  } else if (message.guild.id !== "931626981047545946") {
    return;
  } */
});

client.login(BotToken)