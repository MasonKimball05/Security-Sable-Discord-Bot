const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "tshelp",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "unavailable",
  run: async (client, message, args) => {
    
    if(message.author.id != "569681110360129536"){
        const noperms = new MessageEmbed()
        .setDescription("This Command Only Use By My Owner!")
        .setColor("YELLOW");
        return message.channel.send(noperms)
      } 

    if (args[0]) {
      const command = await client.commands.get(args[0]) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));;

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("> ❯ Name", "`" + command.name + "`" || "Not Name Provied")
        .addField(`> ❯ Useage`, "`" + `%${command.name}` + "`" || "No Command Useage")
        .addField("> ❯ Description", "`" + command.description + "`"|| "Not Description Provided")
        .addField(`> ❯ Timeout`, command.timeout ? command.timeout : "No Timeout Provided")
        .addField(`> ❯ Aliases`, command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription('**A fun and moderation bot designed specially for the Official Party Animals Server!** \n**If you get any errors please do %bug or %bugs to submit a bug report and help me out!**')
  
        .setColor("BLUE")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        
        .setThumbnail(client.user.displayAvatarURL());
          
      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unlisted";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";
        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }
     emx.addField('important links ','**:link:  [Support](https://discord.gg/7JzG54efUS)**')
      return message.channel.send(emx)

    }
  }
};