module.exports = {
    name: "setgames",
    category: "owner",
    description: "Sets your users game activity",
    accessableby: "Owner", 
run: async (bot, message, args) => {
    if (message.author.id !== '530133257707323392') return;

    if(args.length < 2){
        message.channel.send("No game specified");
        return;
    }

    var gameName = "";
    for(var i = 0; i < args.length; i++){
        gameName += args[i] + " ";
    }
    bot.user.setActivity(gameName)
        .then(user => console.log("--> Game set: " + gameName))
        .catch(console.error)
        .then(message.channel.send(`Game set to: "${gameName}"`))
}
}