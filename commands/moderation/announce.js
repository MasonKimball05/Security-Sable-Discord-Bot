const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "announce",
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel id> <msg>",
  accessableby: "Moderators",
  run: async (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;

    if(message.member.permissions.has('MANAGE_GUILD')){

    let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
    console.log(rChannel);
    let MSG = message.content
      .split(`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}announce ${rChannel.id} `)
      .join("");
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`Announcement!`)
      .setDescription(`${MSG}`)
      .setColor("RANDOM");
    rChannel.send(_);
    message.guild.channels.cache.get(modlog).send(_)
    .then(() => {
      message.guild.channels.cache.get(modlog).send(`${message.author} sent an announcement in ${rChannel} announcement reads as:`)
      .then(message.guild.channels.cache.get(modlog).send(_))
    })
    message.delete();
  } else {
    message.reply('You lack the full permissions to do this command!')
  }
}
};
