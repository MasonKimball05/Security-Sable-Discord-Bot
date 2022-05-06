const ms = require('ms');
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: "tempmute",
    description: "temporarily mutes target member",
    category: "moderation",
    accessableby: "Moderators",
    usage: " <@someone> <time>",
    run: async (bot, message, args) => {
        bot.tsmodlog = `<#${tsmodlog}>`
        bot.modlog = `<#${modlog}>`

        try {

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            if (message.member.hasPermission('MANAGE_MESSAGES')) {
                var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
                if (!member) return message.reply('please provide a member to tempmute.')

                let mainrole = message.guild.roles.cache.find(r => r.id == "952772076417220628");
                let mute = message.guild.roles.cache.find(r => r.id == "954865201193291796");
                let staff = message.guild.roles.cache.find(r => r.id === "965767871290564609")

                if (!mute) return message.reply("I couldn't find the 'muted' role.")

                let time = args[1];
                if (!time) {
                    return message.reply("You didn't specify a time!");
                }

                member.roles.remove(mainrole)
                member.roles.remove(staff)
                member.roles.add(mute);

                message.channel.send(`${member.user.tag} has now been muted for ${ms(ms(time))}`)
                member.send(`You have been muted for ${ms(ms(time))} in ${message.guild.name}`)
                bot.channels.cache.get(modlog).send(`${message.author} has muted ${member.user.tag} for ${ms(ms(time))}`)
                bot.channels.cache.get(tsmodlog).send(`${message.author} has muted ${member.user.tag} for ${ms(ms(time))}`)

                setTimeout(function () {
                    member.roles.add(mainrole)
                    member.roles.remove(mute);
                    message.channel.send(`${member.user.tag} has been unmuted.`)
                    bot.channels.cache.get(modlog).send(`${member.user.name} has been unmuted. \n\nMute was performed by ${message.author} \n${member.user.tag} was muted for ${ms(ms(time))}`)
                    bot.channels.cache.get(tsmodlog).send(`${message.user.name} has been unmuted. \n\nMute was performed by ${message.author} \n${member.user.tag} was muted for ${ms(ms(time))}`)
                }, ms(time));
            } else {
                return message.channel.send('You do not have permssions to do this!')
            }
        }
        } catch (e) {
            console.log(e)
            return message.channel.send(`Error: ${e.message}`)
        }
    }
}