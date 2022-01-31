const Discord = require("discord.js")

const { readdirSync } = require("fs");
const discord = require("discord.js")
const ascii = require("ascii-table");
const message = require("../../events/guild/message");
const config = require("../../config.json")
const modlog = config.modlog

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = bot => {     
/**
 * 
 
bot.modlog = `<#${modlog}>`;
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);

            if (pull.name) {
                bot.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
        }
    });

    bot.channels.cache.get('931628582713835531').send(table.toString())
    if(!modlog) return;
    */
  console.log(`${bot.user.tag} is online`)
  bot.user.setActivity("Hello!") 
  bot.channels.cache.get('931628582713835531').send('I am online!')
  if(!'931628582713835531') return;
}