// Declare Packages and Clients
const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION", "MESSAGE", "GUILD_MEMBER", "CHANNEL"],
});

const mongoose = require("mongoose")
const fs = require("fs");
const { prefix, tsmodlog, modlog, ownerId, ts } = require("./config.json");
const toggle = require("./models/toggle")
const fetch = require('node-fetch')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const snipes = new Discord.Collection()
client.events = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

// Login Tokens
const token = require(`./token.json`);
const BotToken = token.BotToken
client.BotToken = BotToken;
client.login(BotToken)

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
client.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message)
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
  /*
  if (cmd === `<ownertoggle`) {
    if (message.author.id !== "569681110360129536") return message.channel.send(`Sorry only my owner can use this command!`);
    if (args[0]) return message.channel.send(`you did not specify the command you want to enable/disable!`);
    
    toggle.findOne({
      Guild: message.guild.id,
      command: args[0]
    }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await toggle.findOneAndDelete({
            Guild: message.guild.id,
            command: args[0]
          })
          .catch(err => console.log(err))
        message.reply(`${args[0]} has been reenabled for this server!`)
      } else if (!data) {
        return message.reply(`This command was not disabled!`)
      }
    })
  } 
  /*
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
    } 
  */
});