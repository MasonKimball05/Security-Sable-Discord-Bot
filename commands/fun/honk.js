module.exports = {
    name: "honk",
    description: "sends a funny duck meme",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {    
        return message.reply(":duck: you mess with the honk, you get the bonk!")
}
}
