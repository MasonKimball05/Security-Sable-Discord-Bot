const Discord = require('discord.js')
const bot = new Discord.Client()

module.exports = {
    name: "channelpoll",
    description: "has the bot send a poll in your channel",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => { 
    if(message.member.hasPermission("MANAGE_MESSAGES")) {

    let chPollDescription = args.slice(0).join(' ');
    let embedPoll = new Discord.MessageEmbed()
    .setTitle('New Community Poll')
    .setDescription(chPollDescription)
    .setColor('YELLOW')
    let msgEmbed = await message.channel.send(embedPoll);
    await msgEmbed.react('👍')
    await msgEmbed.react('👎')
 } else {
  message.channel.send('You are missing some permissions to send this command!')
 }
  }
}
 