const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
  name: "mute",
  description: "mutes target member",
  category: "moderation",
  accessableby: "Moderators", 
  run: async (bot, message, args) => {     
  if(message.member.hasPermission('MANAGE_GUILD')) {
    bot.modlog = `<#${modlog}>`;

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) return message.reply('please provide a member to mute.')

        let mainrole = `<@&${932721322344185926}>`;
        let mute = `<@&${932721354250289172}>`;

        if (!role) return message.reply("I couldn't find the 'muted' role.")

        member.roles.remove(mainrole)
        member.roles.add(mute);

        message.guild.channels.cache.get(modlog).send(`${member.user.tag} has now been muted!`)
        if (!modlog) return message.reply(`${member.user.tag} has now been muted!`)
      } else {
        message.reply('you do not have the permissions to do this command!')
      }
    }

}