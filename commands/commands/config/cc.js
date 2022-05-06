const custom = require("../../models/custom");
const db = require("quick.db")
const {
  MessageEmbed
} = require("discord.js")
const {
  promptMessage
} = require("../../funct.js");

const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
  name: "cc",
  description: "Create a custom command",
  category: "config",
  timeout: 5000,
  aliases: ["custom"],
  usage: " <command-name> <what the command sends>",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`;

    if (message.channel.type === "dm") {
      return message.reply(`this command can only be used in a server!`)

    } else if (message.channel.type !== "dm") {

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

          custom.findOne({
              Guild: message.guild.id,
              Command: args[0]
            },
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

                if (!tsmodlog) return
                bot.channels.cache.get(tsmodlog).send(`${message.member} successfully created  \n**Command:** \`${args[0]}\` \nContent: ${args.slice(1).join(" ")}`);
                message.channel.send(`Successfully created the command \`${args[0]}\``);

                const creator = message.author.tag
                const cmed = args[0]
                const conte = args.slice(1).join(" ")
                const server = message.guild.name

                const report = new MessageEmbed()
                  .setTitle('Custom Command Created/Updated')
                  .setDescription(`Command: **${cmed}** \n\nContent of Command: **${conte}**`)
                  .setTimestamp()
                  .setColor("GREEN")
                  .setFooter(`This command was created/updated by ${creator} in ${server}`)
                bot.channels.cache.get(tsmodlog).send(report)

              }
            })
        } else if (emoji === "❌") {
          msg.delete()
            .then(() => message.channel.send('❌ Custom Command Creation/Update Canceled ❌'))
        }
      });
    }
  },
};