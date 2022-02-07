const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("../../db");
const sourcebin = require("sourcebin_js");

module.exports = {
  name: "help",
  aliases : ['h'],
  category: "helpful",
  description: "Shows all available bot commands.",
  run: async (bot, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`| ${name} |\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
        if (categories.length > 1024) {
          sourcebin
          .create([
            {
              title: "JavaScript code",
              description: 'This code was created in "' + message.createdAt + '"',
              name: "Made By " + message.author.username,
              content: Content,
              languageId: "JavaScript"
            }
          ])
        }
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(`Use \`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}help\` followed by a command name to get more additional information on a command. For example: \`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}help info\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        bot.commands.get(args[0].toLowerCase()) ||
        bot.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}${command.name} ${command.usage}\``
            : `\`${(await db.get(`Prefix_${message.guild.id}`)) ? await db.get(`Prefix_${message.guild.id}`) : "%"}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .addField(
          "TIMEOUT:",
          command.timeout
          ? command.timeout
          : "No timeout timer for this command."
        )
        .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
  }
  },
}