const Discord = require("discord.js");
const ms = require("parse-ms");
const fish = require("../../JSON/fish.json")
const db = require("quick.db")
module.exports = {
    name: "fish",
    description: "Fish some fish.",
    category: "Economy",
    run: async (client, message, args) => {

        const rand = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        let user = message.author;
        let timeout = 60000;

        let randn = rand(0, parseInt(fish.length));
        let randrod = rand(15, 30);

        let fishToWin = fish[randn];
        6

        let fishdb = await db.fetch(`fish_${user.id}`);
        let rod = await db.get(`fish_${user.id}.rod`);
        let rodusage = await db.get(`fish_${user.id}.rodusage`);
        let wait = await db.fetch(`fish_${user.id}.wait`);


        if (!rod) return message.channel.send(`You have to buy a fishing rod!`);

        if (rodusage) {
            if (fishdb.rodusage >= randrod) {
                await db.delete(`fish_${user.id}.rod`);
                return message.reply("Your fishing rod has broken! Go buy a new one!")
            }
        }

        if (wait !== null && timeout - (Date.now() - wait) > 0) {
            let time = ms(timeout - (Date.now() - wait));

            message.channel.send(`:x: You have already fished!\nFish it again in ${time.seconds}s`);

        } else {

            message.channel.send(`:white_check_mark: You went fishing and caught a ${fishToWin}`);

            await db.push(`fish_${user.id}.fish`, fishToWin);
            await db.set(`fish_${user.id}.wait`, Date.now());
            await db.add(`fish_${user.id}.rodusage`, 1);

        }
    }
};