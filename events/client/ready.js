const discord = require("discord.js");
module.exports = bot => { 
  console.log(`${bot.user.tag} is online`)
  bot.user.setActivity("Hello!") 
  bot.channels.cache.get('931628582713835531').send('I am online!')
  if(!'931628582713835531') return;
}
