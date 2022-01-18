const { MessageEmbed } = require("discord.js");
const xp = require("../../schemas/xp.js")

module.exports = async (bot, data) => {
    activities = [`${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`, `${bot.users.cache.size} users!`], i = 0;
    let userID = data.user.id;
    let guildID = data.guild.id;

    if (data.user.id !== bot.user.id) {
        if (data.guild.channels) {
            let logChannel = await data.guild.channels.cache.find(c => c.name === "mod-logs" || undefined);

            if (logChannel) {
                const embed = new MessageEmbed()
                    .setColor("#0efefe")
                    .setTitle("User Left")
                    .setThumbnail(data.user.displayAvatarURL())
                    .setDescription(`${data.user} ${data.user.tag}`)
                    .setFooter(`ID: ${data.user.id}`)
                    .setTimestamp()

                logChannel.send(embed);
            }
        }
    }

    xp.deleteOne({ guildID: guildID, userID: userID }, {
    }).catch(err => console.log(err))
}