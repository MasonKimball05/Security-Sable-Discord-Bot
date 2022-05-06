const {
    MessageEmbed
} = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: 'embedgen',
    aliases: ["emb", "embed"],
    description: 'creates an embed',
    category: "info",
    run: async (client, message, args) => {
        bot.tsmodlog = `<#${tsmodlog}>`
        bot.modlog = `<#${modlog}>`
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the permissions to use this command!")
        try {

            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            //===============================================================================================
            // Getting Started
            const embed = new MessageEmbed();
            message.reply("Reply `skip` or `no` for next question, Reply `cancel` to cancel and end the command.");

            //===============================================================================================
            // Getting Title

            const tita = new MessageEmbed()
            tita.setDescription("Do you want your embed to have a title?")
            tita.addField("Note", "Say skip or no at any point to skip a field (skipped fields return blank) \nSay cancel at any point to cancel the embed")
            message.channel.send(tita);
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (title.first().content !== 'skip' && title.first().content !== 'no' && title.first().content !== 'cancel') embed.setTitle(title.first().content);

            //===============================================================================================
            // Getting Description

            const des = new MessageEmbed()
            des.setDescription("Do you want your embed to have a description?")
            des.addField("Note", "Say skip or no at any point to skip a field (skipped fields return blank) \nSay cancel at any point to cancel the embed")
            message.channel.send(des);
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (Description.first().content !== 'skip' && Description.first().content !== 'no' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);

            //===============================================================================================
            // Getting Footer

            const foot = new MessageEmbed()
            foot.setDescription("Do you want your embed to have a footer?")
            foot.addField("Note", "Say skip or no at any point to skip a field (skipped fields return blank) \nSay cancel at any point to cancel the embed")
            message.channel.send(foot);
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'no' && Footer.first().content !== 'cancel') embed.setFooter(Footer.first().content);

            //===============================================================================================
            // Getting Color

            const col = new MessageEmbed()
            col.setDescription("Do you want your embed to have a specific color? Default color is black")
            col.addField("Note", "Say skip or no at any point to skip a field \nSay cancel at any point to cancel the embed")
            message.channel.send(col);
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (Color.first().content !== 'skip' && Color.first().content !== 'no' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase() || "2f3136")

            //===============================================================================================
            // Getting Author Field

            const auth = new MessageEmbed()
            auth.setDescription("Do you want your embed to have an author field?")
            auth.addField("Note", "Say skip or no at any point to skip a field (skipped fields return blank) \nSay cancel at any point to cancel the embed")
            message.channel.send(auth);
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (Author.first().content !== 'skip' && Author.first().content !== 'no' && Author.first().content !== 'cancel') embed.setAuthor(Author.first().content);

            //===============================================================================================
            // Getting TimeStamp

            const time = new MessageEmbed()
            time.setDescription("Do you want your embed to have a timestamp? Reply yes or no")
            message.channel.send(time);
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('Embed Generator Cancelled')
            if (TimeStamp.first().content == 'no') {
                return message.channel.send(embed)
            } else {
                if (TimeStamp.first().content == 'yes') embed.setTimestamp()
                message.channel.send(embed)
                if (message.guild.id === "930503589707792435") {
                    return bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has created an embed in ${message.channel.name}`)
                } else {
                    bot.channels.cache.get(modlog).send(`${message.author} has created an embed in ${message.channel}`)
                }
            }
        } catch (error) {
            message.channel.send(`There was an error: ${error.message}`);
            console.error(error);
        }
    }
}