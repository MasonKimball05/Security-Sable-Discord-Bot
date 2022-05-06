const custom = require("../../models/custom");
const {
  MessageEmbed
} = require("discord.js")
const {
  promptMessage
} = require("../../funct.js");
module.exports = {
  name: "ccremove",
  description: "Remove a custom command",
  category: "config",
  accessableby: "Moderators",
  usage: " <command-name>",
  run: async (bot, message, args) => {

    if (message.channel.type === "dm") {
      return message.reply(`this command can only be used in a server!`)

    } else if (message.channel.type !== "dm") {

      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send(`You do not have enough permissions!`);
      if (!args[0])
        return message.channel.send(`You did not specify a custom command name!`);

      var embed = new MessageEmbed()
        .setColor("RED")
        .setDescription('Are you sure you want to delete this custom command?')
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
                data.delete();

                message.channel.send(
                  `Successfully removed the command \`${args[0]}\``
                );
              } else if (!data) {
                let Data = new custom({
                  Guild: message.guild.id,
                  Command: args[0],
                  Content: args.slice(1).join(" "),
                });
                Data.delete();
                message.channel.send(
                  `Successfully removed the command \`${args[0]}\``
                );
              }
            });
        } else if (emoji === "❌") {
          msg.delete()
            .then(() => message.channel.send('❌ Custom Command Deletion Canceled ❌'))
          return;
        }
      })
    }
  },
};