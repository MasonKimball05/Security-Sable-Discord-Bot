const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "scp",
    description: "gets info on SCPs and the foundation",
    accessableby: "Moderators",
    category: "Moderation",
    run: async (bot, message, args) => {
        let user = message.member

        if(!args[0]) return message.channel.send('You did not specify what SCP you want information on')

        const scp = args[0]

        if (isNaN(args[0][0])) {
            return message.channel.send(`That is not a number! I need a number for the SCP!`);
        }

        const SCP = new MessageEmbed()
        .setTitle(`SCP ${scp}`)
        .setDescription(`The article on the [SCP **${scp}]**(http://www.scpwiki.com/scp-${scp}) is **[here]**(http://www.scpwiki.com/scp-${scp})`)
        .setURL(`http://www.scpwiki.com/scp-${scp}`)
        .setFooter(`${user.user.username} requested information on SCP ${scp}`, 'https://i.imgur.com/jPV9ChT.png', )
        .setThumbnail(`https://i.imgur.com/jPV9ChT.png`)
        message.channel.send(SCP)
    }
}