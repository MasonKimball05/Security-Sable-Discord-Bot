const Discord = require("discord.js");

module.exports = {
    name: "memes",
    description: "%meme, %prequel, %wholesome",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {    
        message.channel.send('%meme - sends a meme from r/memes \n%wholesome - sends a meme from r/wholesome \nprequel - sends a meme from r/prequel')
}

}