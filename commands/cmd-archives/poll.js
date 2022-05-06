const Discord = require("discord.js");
module.exports = {
  name: "poll",
  description: "Create a simple yes or no poll",
  category: "fun",
  accessableby: "Members",
  run: async (bot, message, args) => {

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send(`You do not have the permissions!, ${message.author.username}`);
      const channel =
        message.mentions.channels.first() ||
        bot.channels.cache.get(args[0]);
      if (!channel) {
        return message.channel.send(`You did not mention / give the id of your channel!`);
      }
      let question = args.slice(1).join(" ")
      if (!question) return message.channel.send(`You did not specify your question!`);
      const Embed = new Discord.MessageEmbed()
        .setTitle(`New poll!`)
        .setDescription(`${question}`)
        .setFooter(`${message.author.username} created this poll.`)
        .setColor(`RANDOM`);
      let msg = await bot.channels.cache.get(channel.id).send(Embed);
      await msg.react("👍");
      await msg.react("👎");
      if (message.guild.id === "930503589707792435") {
        return bot.channels.cache.get(tsmodlog).send(`${message.author.tag} sent a poll in ${channel.name}`)
      } else {
        return bot.channels.cache.get(modlog).send(`${message.author} has sent a poll in ${channel}`)
      }
    }
  },
};