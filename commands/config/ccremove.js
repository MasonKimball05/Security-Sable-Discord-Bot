const custom = require("../../models/custom");
module.exports = {
  name: "ccremove",
  description: "Remove a custom command",
  category: "config",
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(`You do not have enough permissions!`);
    if (!args[0])
      return message.channel.send(`You did not specify a custom command name!`);
    custom.findOne(
      { Guild: message.guild.id, Command: args[0] },
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
      }
    );
  },
};