const ticket = require("../../models/Ticket")
const {
    MessageEmbed,
    discord
} = require("discord.js")
const config = require("../../config.json")
const modlog = config.modlog
const ticketcategory = config.ticketCategory

module.exports = {
    name: 'ticket',
    description: "Creates a ticket for to contact server admins",
    category: "Work in Progress",
    useage: "%ticket <create || close>",
    run: async (bot, message, args) => {

        if (message.author.id != "569681110360129536") {
            const noperms = new MessageEmbed()
                .setDescription("This Command Only Use By My Owner!")
                .setColor("RED");
            return message.channel.send(noperms)
        }

        bot.modlog = `<#${modlog}>`
        bot.ticketcategory = `<#${ticketcategory}>`

        var userName = message.author.username;
        var userDiscriminator = message.author.discriminator;
        var bool = false;
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("You already made a ticket open!");

            bool = true;

        }

        if (bool == true) return;

        var embedCreateTicket = new MessageEmbed()
            .setTitle("Hey, " + message.author.username)
            .setFooter("Ticket channel is being made...");

        message.channel.send(embedCreateTicket);

        // Create channel and put it in the right catogary
        message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal

            createdChan.setParent(ticketcategory).then((settedParent) => { // Zet kanaal in category.

                // Put permissions for everyone
                settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), {
                    "READ_MESSAGES": false
                });
                settedParent.overwritePermissions(message.guild.roles.find('name', "@Admin"), {
                    "VIEW_CHANNEL": true
                });
                // Put permission by the user that created the ticket
                settedParent.overwritePermissions(message.author, {

                    "READ_MESSAGES": true,
                    "SEND_MESSAGES": true,
                    "ATTACH_FILES": true,
                    "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false,
                    "ADD_REACTIONS": true

                });
                var embedParent = new MessageEmbed()
                    .setTitle("Hey, " + message.author.username.toString())
                    .setDescription("Put down here your question");

                settedParent.send(embedParent);
            }).catch(err => {
                console.log(err)
                message.channel.send("Something went wrong.");
            });
        }).catch(err => {
            console.log(err)
            message.channel.send("Something went wrong.");
        });
    }
}