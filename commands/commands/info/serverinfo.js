const {
    MessageEmbed,
    Discord
} = require('discord.js');
const dateformat = require('dateformat')

module.exports = {
    name: "server-info",
    category: "info",
    description: "gets info on the server",
    accessableby: "Members",
    aliases: ["serverinfo", "si"],

    run: async (bot, message, args) => {

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {


            let icon = message.guild.iconURL({
                size: 2048
            }); // Server Avatar

            let region;
            switch (message.guild.region) {
                case "europe":
                    region = '🇪🇺 Europe';
                    break;
                case "us-east":
                    region = '🇺🇸 us-east'
                    break;
                case "us-west":
                    region = '🇺🇸 us-west';
                    break;
                case "us-south":
                    region = '🇺🇸 us-south'
                    break;
                case "us-central":
                    region = '🇺🇸 us-central'
                    break;
                case "singapore":
                    region = '🇸🇬 singapore'
                    break;
                case "brazil":
                    region = '🇧🇷 brazil'
                    break;
                case "hong-kong":
                    region = '🇭🇰 hong-kong'
                    break;
                case "india":
                    region = '🇮🇳 india'
                    break;
                case "japan":
                    region = '🇯🇵 japan'
                    break;
                case "russia":
                    region = '🇷🇺 russia'
                    break;
                case "south-africa":
                    region = '🇿🇦 south-africa'
                    break;
                case "sydney":
                    region = '🇦🇺 sydney'
                    break;
            }

            // Members
            let member = message.guild.members;
            let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
                online = member.cache.filter(m => m.user.presence.status === "online").size,
                idle = member.cache.filter(m => m.user.presence.status === "idle").size,
                dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
                robot = member.cache.filter(m => m.user.bot).size,
                total = message.guild.memberCount;

            // Channels
            let channels = message.guild.channels;
            let text = channels.cache.filter(r => r.type === "text").size,
                vc = channels.cache.filter(r => r.type === "voice").size,
                category = channels.cache.filter(r => r.type === "category").size,
                totalchan = channels.cache.size;
            let totalchann = Math.floor(totalchan - category)
            // Region
            //let location = region[message.guild.region];

            // Date
            let x = Date.now() - message.guild.createdAt;
            let h = Math.floor(x / 86400000);
            let created = dateformat(message.guild.createdAt); 

            const embed = new MessageEmbed()
                .setColor(0x7289DA)
                .setTimestamp(new Date())
                //.setThumbnail(icon)
                .setAuthor(message.guild.name, icon)
                .setDescription(`**ID:** ${message.guild.id}`)
                //.addField("Region 🗺", region)
                .addField("Date Created", `${created} \n\Created **${h}** day(s) ago`)
                .addField("Owner", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
                .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
                .addField(`Channels [${totalchann}]`, `Text: ${text} \nVoice: ${vc} \nCategories: ${category}`)
                .setThumbnail(message.guild.iconURL({
                    dynamic: true,
                    format: "png"
                }))
            message.channel.send(embed);
        }
    }
}