const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,
    logChannelID: String,
    rankChannelID: String,
    rankRoles: String,
    rankLevelUP: String, 
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');