const {
    MessageEmbed,
    Message
} = require('discord.js');

module.exports = {
    name: "json",
    description: "Converts supplied text into a JSON format for an embed",
    accessability: "moderators",
    usage: ' <#channel> {"title": "example", "description": "example", "color": "RED"}',
    category: "utility",
    run: async (bot, message, args) => {

        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send("You lack the permissions to send this command!")
        }
        if (!args[0]) {
            return message.reply(`No channel or string text supplied! Command usage example: \n%json <#channel> {"title": "example", "description": "example", "color": "RED"}`)
        }
        const chnl = message.mentions.channels.first() || message.channels.cache.find(r => r.id === args[0]) || message.channels.cache.find(r => r.name === args[0])
        if (!chnl) {
            return message.reply(`I could not find that channel!`)
        }
        if (!args[1].startsWith("{")) {
            return message.reply('you need to start the JSON command with {')
        }
        if (!message.content.endsWith("}")) {
            return message.reply('you need to end the JSON command with }')
        }

        args.shift();

        const json = JSON.parse(args.join(' '))

        chnl.send('', {
                embed: json,
            })
            .then(() => message.channel.send(`JSON command embed sent in ${chnl}`))
    }
}