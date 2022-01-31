const { DiscordAPIError, MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../funct.js");

module.exports = {
    name: "reload",
    category: "owner",
    description: "Reloads a command.",
    permissions: "admin",
    usage: "<category> <command>",
    run: (bot, message, args) => {
        if (message.author.id !== '569681110360129536') {
            return;
        }
        const filter = m => m.author.id === message.author.id;

        const cat = args[0]
        if (!args[0])
        return message.channel.send("Please provide a category")
        
        if (!args[1]) {
        var embed = new MessageEmbed()
        .setDescription('Do you want to reload a command? \nPlease react with ✅ if yes \nPlease react with ❌ if just a category')
        message.channel.send(embed).then(async msg => {
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
        if (emoji === "✅") {
            msg.delete()
            .then(() => {
                message.channel.send("What command would you like to reload?")
                message.channel.awaitMessages(filter, {
                    max: 1,
                    error: ["time"],
                    time: 15000
                })
                .then(collected => {
                    const m = collected.first();
                
            var commandCategory = cat
            const commandName = m
            
            try {
                delete require.cache[require.resolve(`../${commandCategory}/${commandName}.js`)] // usage te!reload <name>
                bot.commands.delete(commandName)
                let pull = require(`../${commandCategory}/${commandName}.js`)
                bot.commands.set(commandName, pull)
            } catch (e) {
                return message.reply(`Could not reload: \n\`${m}\``)
            }
    
            message.reply(`The command \`${m}\` has been reloaded!`)
        })
    })
    } else if (emoji === "❌") {
        var commandCategory = cat
        msg.delete();
        try{
            delete require.cache[require.resolve(`../${commandCategory}`)]
            bot.commands.delete(commandCategory)
            let pull = require(`../../commands/${commandCategory}`)
            bot.commands.set(commandCategory, pull)
        } catch (e) {
            return message.reply(`Could not reload: \`${commandCategory.toUpperCase()}\``)
        }
        message.reply(`The category \`${commandCategory}\` has been reloaded!`)
        } else {
            var commandCategory = cat
            if(args[1]) 
            try {
                delete require.cache[require.resolve(`../${commandCategory}/${commandName}.js`)] // usage !reload <name>
                bot.commands.delete(commandName)
                let pull = require(`../${commandCategory}/${commandName}.js`)
                bot.commands.set(commandName, pull)
            } catch (e) {
                return message.reply(`Could not reload: \`${args[1].toUpperCase()}\``)
            }
    
            message.reply(`The command \`${args[1].toUpperCase()}\` has been reloaded!`)
        }
    })
    }
}
}