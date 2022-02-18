module.exports = {
  name: "idtheft",
  description: "Makes a webhook to impersonate someone",
  usage: "sudo <user> <message>",
  category: "utility",
  aliases: ["idth"],
  cooldown: 5,
  botpermission: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!message.member.hasPermission("MANAGE_WEBHOOKS")) {
        return message.channel.send(`You Don't Have Permission To Use This Command! Manage webhook`)
      }
      message.delete();
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user) return message.channel.send("Please provide a user!");
      if (!args[1]) return message.reply(`You didn't tell me what to say`)
      const webhook = await message.channel.createWebhook(user.displayName, {
        avatar: user.user.displayAvatarURL(),
        channel: message.channel.id
      });
      await webhook.send(args.slice(1).join(" ")).then(() => {
        webhook.delete();
      });
    }
  }
};