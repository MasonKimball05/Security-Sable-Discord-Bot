const ms = require('ms');
const config = require("../../config.json")
const modlog = config.modlog

module.exports = {
    name: "tempmute",
    description: "temporarily mutes target member",
    category: "moderation",
    accessableby: "Moderators",
    run: async (bot, message, args) => {

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            if (message.member.hasPermission('MANAGE_MESSAGES')) {
                var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
                if (!member) return message.reply('please provide a member to tempMute.')
                bot.modlog = `<#${modlog}>`;

                let mainrole = `<@&${932721322344185926}>`;
                let mute = `<@&${932721354250289172}>`;

                if (!mute) return message.reply("I couldn't find the 'muted' role.")

                let time = args[1];
                if (!time) {
                    return message.reply("You didn't specify a time!");
                }

                member.roles.remove(mainrole)
                member.roles.add(mute);

                message.channel.send(`${member.user.tag} has now been muted for ${ms(ms(time))}`)
                message.guild.channels.cache.get(modlog).send(`${message.author} has muted ${member.user.tag} for ${ms(ms(time))}`)

                setTimeout(function () {
                    member.roles.add(mainrole)
                    member.roles.remove(mute);
                    message.channel.send(`${member.user.tag} has been unmuted.`)
                    message.guild.channels.cache.get(modlog).send(`${member.user.tag} has been unmuted. \n\nMute was performed by ${message.author} \n${memeber.user.tag} was muted for ${ms(ms(time))}`)
                }, ms(time));

            } else {
                return message.channel.send('You do not have permssions to do this!')
            }
        }
    }
}