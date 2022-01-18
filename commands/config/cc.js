const custom = require("../../models/custom");
const db = require("quick.db")

module.exports = {
  name: "cc",
  description: "Create a custom command",
  category: "config",
  timeout: 5000,
  aliases: ["custom"],
  run: async (bot, message, args) => {
    const modlog = db.get(`moderation.${message.guild.id}.modlog`);
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(`You do not have enough permissions!`);
    if (!args[0])
      return message.channel.send(`You did not specify a custom command name!`);
    if (!args.slice(1).join(" "))
      return message.channel.send(`No content specified!`);
    custom.findOne(
      { Guild: message.guild.id, Command: args[0] },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Content = args.slice(1).join(" ");
          data.save();

          message.channel.send(
            `Successfully updated the command \`${args[0]}\``
          );
        } else if (!data) {
          let newData = new custom({
            Guild: message.guild.id,
            Command: args[0],
            Content: args.slice(1).join(" "),
          });
          newData.save();
          message.guild.channels.cache.get(modlog.channel).send(`${message.member} successfully created  \n**Command:** \`${args[0]}\` \nContent${args.slice(1).join(" ")}`);
          message.channel.send(`Successfully created the command \`${args[0]}\``);
          if (!modlog) return;
          
        }
      }
    );
  },
};
