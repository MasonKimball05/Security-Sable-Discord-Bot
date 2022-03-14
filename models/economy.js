const mongoose = require("mongoose")

const Schema = mongoose.Schema({

    name: String,
    userID: String,
    daily: Number,
    weekly: Number,
    WorkTimer: Number,
    money: [{
        wallet: Number,
        bank: Number,
    }],
    vip1: Number,
    vip2: Number,
    vip3: Number,
    rod: [{
        hp: Number,
        amount: Number
    }],
    fish: [{
        type: String,
        amount: Number
    }]
})

module.exports = mongoose.model("Data", Schema);