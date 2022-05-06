const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    category: "owner",
    description: "gives info on the bot itself",
    accessableby: "Owner", 
    run: async (bot, message, args) => {
        if (message.author.id !== '569681110360129536') return;
        const data = eval(args.join(' ').replace(/```/g, ''));
        if (data.includes(`SECRET`) || data.includes(`TOKEN`) || data.includes(`token`) || data.includes(`Token`) || data.includes("process.env")) {
            evaled = "No, shut up, what will you do it with the token?";
          } else {
        const embed = new MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed);
        try {

            const embed = new MessageEmbed()
                .setTitle('Output: ')
                .setDescription(await data)
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                });
        } catch (e) {
            const embed = new MessageEmbed()
                .setTitle('An Error has occured')
            return await msg.edit(embed);

        }
    }
}
}