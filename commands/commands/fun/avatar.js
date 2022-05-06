const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const {
  Color
} = require("../../config.json");

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp", "av"],
  category: "fun",
  description: "Show Member Avatar!",
  usage: " <@someone>",
  accessableby: "everyone",
  run: async (client, message, args) => {

    if (message.channel.type === "dm") {
      let Member = message.author

      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .addField(
          "Image Download Links",
          `[Png](${Member.displayAvatarURL({
          format: "png",
          dynamic: true
        })}) | [Jpg](${Member.displayAvatarURL({
          format: "jpg",
          dynamic: true
        })}) | [Webp](${Member.displayAvatarURL({
          format: "webp",
          dynamic: true
        })})`
        )
        .setImage(Member.displayAvatarURL({
          dynamic: true
        }))
        .setTimestamp()
        .setFooter(`Your profile picture`);

      message.channel.send(embed)

    } else if (message.channel.type !== "dm") {

      let Member = message.mentions.users.first() || message.guild.member(args[0]) || message.author;

      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .addField(
          "Image Download Links",
          `[Png](${Member.displayAvatarURL({
          format: "png",
          size: 512,
          dynamic: true
        })}) | [Jpg](${Member.displayAvatarURL({
          format: "jpg",
          size: 512,
          dynamic: true
        })}) | [Webp](${Member.displayAvatarURL({
          format: "webp",
          size: 512,
          dynamic: true
        })})`
        )
        .setImage(Member.displayAvatarURL({
          dynamic: true
        }))
        .setTimestamp()
        .setFooter(`${message.author.tag}'s profile picture`);

      message.channel.send(embed);

    }
  }
};