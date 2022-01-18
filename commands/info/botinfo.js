const { MessageEmbed } = require('discord.js')
const os = require('os')
module.exports = {
    name: "bot-info",
    category: "info",
    aliases: ["botinfo", "b-info", "binfo"],
    description: "gives info on the bot itself",
    accessableby: "Members", 

    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(bot.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('#000000')
            .addFields(
                {
                    name: '🌐 Servers',
                    value: `Avilable ${bot.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Channels',
                    value: `Watching over ${bot.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👥 Server Users',
                    value: `Listening to ${bot.users.cache.size} members`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(bot.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: '⏳ Join Date',
                    value: bot.user.createdAt,
                    inline: true
                },
                {
                    name: 'Server Info',
                    value: `Cores: ${os.cpus().length}`,
                    inline: true
                }
            )
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())

        await message.channel.send(embed)
    }
}
