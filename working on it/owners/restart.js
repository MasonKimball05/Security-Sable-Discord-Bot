module.exports = {
    name: "restarts",
    category: "owner",
    description: "restarts the bot! Only my creator can use this command!",
    accessableby: "Owner", 

    run: async (bot, message, args) => {
        if (message.author.id !== '530133257707323392'){
            return;
        }
        await message.channel.send(`Restarting bot...`)
        process.exit();
    }
}