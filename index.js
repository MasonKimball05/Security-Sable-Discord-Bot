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
const { GiveawaysManager } = require("discord-giveaways");
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
  if (cmd === `Hello`){
    message.reply(`hello!`)
  } /*
  if (cmd === `vent`) {
    const vent = args.slice(0).join(" ")
    const chan = `932489232008769546`

    if(!vent) return message.channel.send(`nothing to say?`)

    const embed = new MessageEmbed()
    .setDescription(vent)
    .setTimestamp()

    bot.channels.cache.get(chan).send(embed)
  } */
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
client.login('SECRET')
