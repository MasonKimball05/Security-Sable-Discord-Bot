const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'badges',
    category: 'info',
    description: "shows all badges someone has",
    usage: " (@someone)",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        console.log(flags);

        message.channel.send(`${user}'s badges: ${flags.join(', ')}`)
    }
}