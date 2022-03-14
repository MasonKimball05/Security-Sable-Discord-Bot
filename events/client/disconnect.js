module.exports = async(client) => {

console.log("Bot is disconnected...");
    client.channels.cache.get("931628582713835531").send(`I have disconnected from message stream. Attempting to reconnect...`)
}