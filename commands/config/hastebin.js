const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "hastebin",
  usage: `haste <code/text>`,
  category: "utility",
  args: true,
  aliases: ["haste"],
  run: async (client, message, args) => {
    message.delete();
    const Content = args.join(" ");
    sourcebin
      .create([
        {
          title: "JavaScript code",
          description: 'This code was created in "' + message.createdAt + '"',
          name: "Made By " + message.author.username,
          content: Content,
          languageId: "JavaScript"
        }
      ])
      .then(src => {
        let embed = new discord.MessageEmbed()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(`Code:\n${Content}\n\n**[Click Here](${src.url})**`)
          .setTimestamp()
          .setFooter(`code posted by ${message.author.username}`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Error, try again later`);
      });
  }
};