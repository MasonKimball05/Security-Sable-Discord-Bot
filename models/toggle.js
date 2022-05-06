const mongoose = require("mongoose")
let Schema = new mongoose.Schema({
    Guild: String,
    command: String
})
module.exports = mongoose.model('toggle', Schema);