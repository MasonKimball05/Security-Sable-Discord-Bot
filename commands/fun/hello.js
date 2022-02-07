module.exports = {
    name: "hello",
    description: "sends a basic greeting",
    category: "fun",
    accessableby: "Members",
    run: async (bot, message, args) => {    
        return message.reply("Hello")
}
}