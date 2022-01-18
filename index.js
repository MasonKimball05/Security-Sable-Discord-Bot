const Discord = require("discord.js");
const client = new Discord.Client({
    disableMentions: "everyone",
    partials: ["REACTION", "MESSAGE"],
});
const mongoose = require("mongoose")
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;

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

client.login("owners eyes only")
