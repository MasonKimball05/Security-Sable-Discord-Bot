const {
    MessageEmbed
} = require('discord.js');
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: 'unban',
    description: "unbans target member",
    category: "moderation",
    accessableby: "Moderators",
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You are missing **BAN_MEMBERS** permission!').then(m => m.delete({
                timeout: 5000
            }));

            if (!args[0]) return message.channel.send('please enter a users id to unban!').then(m => m.delete({
                timeout: 5000
            }));

            let member;

            try {
                member = await bot.users.fetch(args[0])
            } catch (e) {
                console.log(e)
                return message.channel.send('Not a valid user!').then(m => m.delete({
                    timeout: 5000
                }));
            }

            const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

            const embed = new MessageEmbed()
                .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({
                    dynamic: true
                }));

            message.guild.fetchBans().then(bans => {

                const user = bans.find(ban => ban.user.id === member.id);

                if (user) {
                    embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                        .setColor('BLACK')
                        .addField('User ID', user.user.id, true)
                        .addField('user Tag', user.user.tag, true)
                        .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                        .addField('Unbanned Reason', reason)
                    message.guild.members.unban(user.user.id, reason).then(() => bot.channels.cache.get(modlog).send(embed))
                } else {
                    embed.setTitle(`User ${member.tag} isn't banned!`)
                        .setColor('BLACK')
                    if (message.guild.id === "930503589707792435") {
                        return bot.channels.cache.get(tsmodlog).send(embed)
                    } else {
                        bot.channels.cache.get(modlog).send(embed)
                        if (!modlog) return message.channel.send(embed)
                    }
                }

            }).catch(e => {
                console.log(e)
                message.channel.send('An error has occurred!')
            });
        }
    }
}