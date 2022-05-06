const {
    discord,
    MessageEmbed
} = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "owneradd",
    description: "Allows bot owner to give rare or unique items",
    accessability: "everyone",
    aliases: ["oadd"],
    category: "Economy",
    run: async (client, message, args) => {

        if (message.author.id != "569681110360129536") {
            const noperms = new MessageEmbed()
                .setDescription("This Command Only Used By My Owner!")
                .setColor("YELLOW");
            return message.channel.send(noperms)
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase());

        if (!user) return message.reply(`nobody to give items to?`)

        let author = await db.fetch(`money_${user.id}.pocket`)

        switch (args[1]) {
            case "bronze":
            case "vip1":

                await db.fetch(`bronze_${user.id}`)
                await db.set(`bronze_${user.id}`, true)
                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${user} has been given the Bronze VIP!`)
                message.channel.send(embed)
                break;

            case "silver":
            case "vip2":

                await db.fetch(`silver_${user.id}`)
                await db.set(`silver_${user.id}`, true)
                let embed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${user} has been given the Silver VIP!`)
                message.channel.send(embed2)
                break;

            case "gold":
            case "vip3":

            await db.fetch(`gold_${user.id}`)
            await db.set(`gold_${user.id}`, true)
                let embed9 = new MessageEmbed()
                .setColor("GREEN")
                    .setDescription(`${user} has been given the Gold VIP!`)
                message.channel.send(embed9)
                break;

            case "fishing":
            case "rod":

                await db.fetch(`fish_${user.id}.rod`)
                await db.add(`fish_${user.id}.rod`, 1);
                await db.set(`fish_${user.id}.fish`, [])

                let embed3 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${user} has been given a Fishing Rod!`)
                message.channel.send(embed3)
                break;

            default:
                let embed4 = new MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription('Enter an item to give!')
                message.channel.send(embed4)
                break;
        }
    }
}