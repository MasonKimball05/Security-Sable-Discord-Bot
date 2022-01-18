module.exports = {
    name: "ban-info",
    aliases: ["baninfo", "bani"],
    description: "Create a simple yes or no poll",
    category: "fun",
    accessableby: "Members",
    run: async (bot, message, args) => {
    if(!message.member.permissions.has('BAN_MEMBERS')) return;

  
    message.guild.fetchBans().then(bans => {

        const embed = new MessageEmbed()
        .setTitle('Server Bans')
        .setDescription(`The members ${bans.members.tag} have been banned from **${message.guild}**`)
        .setTimestamp()
        .setThumbnail(`Requested by ${message.member.displayName}`)
        message.channel.send(embed)
      })
      }
  }