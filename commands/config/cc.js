const custom = require("../../models/custom");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { promptMessage } = require("../../funct.js");

const config = require("../../config.json")
const modlog = config.modlog
module.exports = {
  name: "cc",
  description: "Create a custom command",
  category: "config",
  timeout: 5000,
  aliases: ["custom"],
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(`You do not have enough permissions!`);

    if (!args[0])
      return message.channel.send(`You did not specify a custom command name!`);

    if (!args.slice(1).join(" "))
      return message.channel.send(`No content specified!`);

      var embed = new MessageEmbed()
      .setColor("RED")
      .setDescription('Do you want to create/update this custom command?')
      message.channel.send(embed).then(async msg => {
      const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
      if (emoji === "✅") {

    custom.findOne(
      { Guild: message.guild.id, Command: args[0] },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Content = args.slice(1).join(" ");
          data.save();

          message.channel.send(`Successfully updated the command \`${args[0]}\``);
        } else if (!data) {
          let newData = new custom({
            Guild: message.guild.id,
            Command: args[0],
            Content: args.slice(1).join(" "),
          });
          newData.save();
          
          message.guild.channels.cache.get(modlog).send(`${message.member} successfully created  \n**Command:** \`${args[0]}\` \nContent${args.slice(1).join(" ")}`);
          message.channel.send(`Successfully created the command \`${args[0]}\``);
          if (!modlog) return;

          const creator = message.author.tag
          const cmed = args[0]
          const conte = args.slice(1).join(" ")
          const server = message.guild.name

          const report = new MessageEmbed()
          .setTitle('Custom Command Created/Updated')
          .setDescription(`Command: **${cmed}** \n\nContent of Command: **${conte}**`)
          .setTimestamp()
          .setColor("GREEN")
          .setFooter(`This command was created/updated by ${creator}, ${creator.user.id}, in ${server}`)
          bot.channels.cache.get('932489232008769546').send(report)

        } else if(emoji === "❌") {
          msg.delete()
          .then(() => message.channel.send('❌ Custom Command Creation/Update Canceled ❌'))
        }
      })
          
        }
      }
    );
  },
};