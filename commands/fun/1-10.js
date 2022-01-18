module.exports = {
    name: "1-10",
    description: "sends a random number from 1-10",
    category: "fun",
    accessableby: "Members",
    run: async (bot, message, args) => {       
        message.channel.send(Math.floor(Math.random() * 10));
}
}
