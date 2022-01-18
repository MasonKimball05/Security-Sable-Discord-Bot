module.exports = {
    name: "hi",
    description: "sends a greeting",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {
    message.reply("Hello")
}
}

