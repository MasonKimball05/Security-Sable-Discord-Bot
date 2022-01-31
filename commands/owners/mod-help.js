const Discord = require("discord.js");
const db = require("../../db");

module.exports = {
    name: "modhelps",
    description: "sends help",
    category: "info",
    accessableby: "Members",
    run: async (bot, message, args) => {  
        if (message.author.id !== '530133257707323392') return;
        //We have to set a argument for the help command beacuse its going to have a seperate argument.
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);
    if (!message.member.hasPermission("MANAGE_GUILD")) return; 
    //Normal usage of (prefix)help without any args. (Shows all of the commands and you should set the commands yourself)
    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(`Here are the Avaible Commands to use:`)
            .setDescription('```| announce | ban | cc | ccremove | channelpoll | clear | dm | getmods | getwelcomechannel | getwelcomemessage | give-role | giveaway | kick | lock | mod-help | mute | poll | prefix | removewelcomechannel | removewelcomemessage | report | say | setwelcomechannel | setwelcomemessage | bans | tempmute | unban | unmute | warn | warns |```')
            .addFields({ name: 'Prefix', value: `The prefix for ${message.guild.name} is \`${
                (await db.get(`Prefix_${message.guild.id}`))
                  ? await db.get(`Prefix_${message.guild.id}`)
                  : "%"
              }\``,  inline: true})
            .setColor('RED')

        message.channel.send(embed);
    }

    //Reads the moudle.exports.config (This line of code is on commands folder, each command will read automaticly) by the second argument (the command name) and shows the information of it.
    if(helpArgs[0]) {
        let command = helpArgs[0];

        if(bot.commands.has(command)) {

            command = bot.commands.get(command);
            var embed = new Discord.MessageEmbed()
            .setAuthor(`${command.name} Command`)
            .setDescription(`
            - **Command's Usage:** __${(await db.get(`Prefix_${message.guild.id}`))
            ? await db.get(`Prefix_${message.guild.id}`)
            : "%"
            }${command.name || "No Usage"}__
            - **Command's Name:** __${command.name || "There is no given name for this command."}__
            - **Command's Description:** __${command.description || "There is no Description for this command."}__
            - **Command's Accessibility:** __${command.accessableby || "Members"}__
            `)
            .setColor('RED')

        message.channel.send(embed);
    }}
}
}