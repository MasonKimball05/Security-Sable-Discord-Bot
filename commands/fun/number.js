module.exports = {
    name: "number",
    description: "sends a random number from 1-100",
    category: "fun",
    accessableby: "Members", 
    run: async (bot, message, args) => {    
        message.channel.send(Math.floor(Math.random() * 100));
}
    }