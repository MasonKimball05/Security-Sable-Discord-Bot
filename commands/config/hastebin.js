const discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "hastebin",
  usage: `haste <code/text>`,
  category: "utility",
  description: "Allows you to create a hastebin for code or text",
  aliases: ["haste"],
  run: async (client, message, args) => {
    message.delete();
    if (!args[0]) return message.reply(`you need to actually send something.`)
    const Content = args.join(" ");
    sourcebin
      .create([{
        title: "JavaScript code",
        description: 'This code was created in "' + message.createdAt + '"',
        name: "Made By " + message.author.username,
        content: Content,
        languageId: "JavaScript"
      }])
      .then(src => {
        let embed = new discord.MessageEmbed()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(`**Code:**\n${Content}\n\n**[Hastebin Link Here](${src.url})**`)
          .setTimestamp()
          .setFooter(`Code posted by ${message.author.username}`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Error, try again later`);
      });
  }
};