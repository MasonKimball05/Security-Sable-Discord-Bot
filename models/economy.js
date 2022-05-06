const { boolean } = require("mathjs");
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
    vip1: boolean,
    vip2: boolean,
    vip3: boolean,
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