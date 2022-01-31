module.exports = {
    name: "restart",
    category: "owner",
    description: "restarts the bot! Only my creator can use this command!",
    accessableby: "Owner", 
    aliases: ["offline", "end", "update"],

    run: async (bot, message, args) => {
        if (message.author.id !== '569681110360129536'){
            return;
        }
        await message.channel.send(`Restarting bot...`)
        process.exit();
    }
}