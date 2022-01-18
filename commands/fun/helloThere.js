module.exports = {
    name: "hello-there!",
    description: "sends a star wars funny prequle meme",
    category: "fun",
    accessableby: "Members",
    run: async (bot, message, args) => {   
        message.reply('General Kenobi!')
    }
}