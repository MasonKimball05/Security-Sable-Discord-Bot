const { Discord, MessageEmbed, Message } = require("discord.js")
const db = require("quick.db");
const { off } = require("../../models/custom");

module.exports = {
    name: "profile",
    description: "Gets the user economy profile",
    aliases: ["inventory", "inv"],
    useage: "%profile <user>",
    accessability: "everyone",
    category: "Economy",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.member;
        
        let bal = db.fetch(`money_${user.id}`)
        let bank = db.fetch(`bank_${user.id}`)
        let fish = await db.fetch(`fish_${user.id}.fish`);
        if (fish === null) fish = 0

        let rod = await db.get(`fish_${user.id}.rod`)
        if (rod === null) rod = 0;

        let bronz = await db.fetch(`bronze_${user.id}`)
        if (bronz === null) bronz = "No";
        if (bronz === true) bronz = "Yes";

        let sil = await db.fetch(`silver_${user.id}`)
        if (sil === null) sil = "No";
        if (sil === true) sil = "Yes";

        let gol = await db.fetch(`gold_${user.id}`)
        if (gol === null) gol = "No";
        if (gol === true) gol = "Yes";
        if (gol === 1) gol = "Yes"
    
        if (bank === null) bank = 0 
        let Total = bal + bank

        if(user) {
            const profileEm = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${user.user.username}'s Profile`)
            .addField(`**Net Worth:**` ,`**${user.user.username}'s Balance**\n**Cash:** $${bal}\n**Bank:** $${bank}\n**Total:** $${Total}`, true)
            .addField(`**VIP**`, `**Gold VIP:**\n${gol} \n\n**Silver VIP:** \n${sil} \n\n**Bronze VIP:** \n${bronz}`, true)
            .addField(`Inventory Items`, `**Fishing Rods:** \n${rod}`)
            message.channel.send(profileEm)
        }
    }
}