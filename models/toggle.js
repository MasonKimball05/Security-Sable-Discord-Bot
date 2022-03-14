const mongoose = require("mongoose")

const Schema = mongoose.Schema({

    dms: String,
    automod: String,
    server: String
})

module.exports = mongoose.model("Data", Schema);