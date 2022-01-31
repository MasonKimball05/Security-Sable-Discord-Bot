const { DiscordAPIError, MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../funct.js");

module.exports = {
    name: "edit",
    description: "This command is under testing no public use allowed yet",
    category: "test",
    accessableby: "owner",
    run: async (bot, message, args) => {

        if (message.author.id !== '569681110360129536') {
            return message.reply("You're not the bot the owner! This is a test command! You can't use it!")
        }
        if (args[0] != message.id && message.author != "931626455471886387") {
            return messsage.channel.send("You did not either: \nGive me a message id of a message you would like me to edit. \nOr the message id you gave me is not my message!")

        } else {
            if (args[0] == message.id && message.author == "931626455471886387") {
                if(message.content != message.embed) {
                        var embed = new MessageEmbed()
                        .setDescription(`Would you like to edit ${message.id}?`)
                        message.channel.send(embed).then(async msg => {
                        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
                        if (emoji === "✅") {
                            msg.delete()
                            .then(() => {
                                message.channel.send("What would you like to reload?")
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    error: ["time"],
                                    time: 15000
                                })
                                .then(collected => {
                                    const m = collected.first();   
                                })
            
        })
    }
})
    }
}
        }
    }
}