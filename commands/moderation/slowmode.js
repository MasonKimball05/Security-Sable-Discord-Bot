const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  usage: "<time>",
  run: (bot, message, args) => {
    bot.modlog = `<#${modlog}>`;
    bot.tsmodlog = `<#${tsmodlog}>`

    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      const che = message.channel.id
      const amount = parseInt(args[0]);
      if (message.member.hasPermission("MANAGE_CHANNEL"))
        if (isNaN(amount))
          return message.channel.send(":x: It doesn't seem to be valid number");
      if (args[0] === amount + "s") {
        message.channel.setRateLimitPerUser(amount);
        if (amount > 1) {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} seconds`)
            message.channel.send("slowmode is now " + amount + " seconds")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} seconds`)
            message.channel.send("slowmode is now " + amount + " seconds");
            return;
          }
        } else {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} second`)
            message.channel.send("slowmode is now " + amount + " second")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} second`)
            message.channel.send("slowmode is now " + amount + " second");
            return;
          }
        }
      }
      if (args[0] === amount + "min") {
        message.channel.setRateLimitPerUser(amount * 60);
        if (amount > 1) {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} minutes`)
            message.channel.send("slowmode is now " + amount + " minutes")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} minutes`)
            message.channel.send("slowmode is now " + amount + " minutes");
            return;
          }
        } else {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} minute`)
            message.channel.send("slowmode is now " + amount + " minute")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} minute`)
            message.channel.send("slowmode is now " + amount + " minute");
            return;
          }
        }
      }
      if (args[0] === amount + "h") {
        message.channel.setRateLimitPerUser(amount * 60 * 60);
        if (amount > 1) {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} hours`)
            message.channel.send("slowmode is now " + amount + " hours")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} hours`)
            message.channel.send("slowmode is now " + amount + " hours");
            return;
          }
        } else {
          if (message.guild.id === "930503589707792435") {
            bot.channels.cache.get(tsmodlog).send(`${message.author.tag} has set a slowmode for the channel ${che.name} \nSlowmode timer for the channel is now: ${amount} hour`)
            message.channel.send("slowmode is now " + amount + " hour")
            return;
          } else {
            bot.channels.cache.get(modlog).send(`${message.author} has set a slowmode for the channel: <#${che}> (${che}) \nSlowmode timer for the channel is now: ${amount} hour`)
            message.channel.send("slowmode is now " + amount + " hour");
            return;
          }
        }
      } else {
        message.channel.send(
          "You can only set seconds(s), minutes(min) and hours(h)"
        );
      }
    }
  }
};