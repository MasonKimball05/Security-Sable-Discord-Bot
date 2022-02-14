const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

module.exports = {
    name: "github",
    aliases: ["git"],
    category: "helpful",
    usage: "Github {optional: PartyAnimalGit}",
    description: `Arkan User Account Information!`,
    run: async (client, message, args) => {

       try {
    
  fetch(`https://api.github.com/users/ArkanReborn`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`User Not Found! Please contact support`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
    if (args[0] !== `PartyAnimalGit`) {

            const embed = new MessageEmbed()
            .setAuthor(`${login}'s (aka Arkan's) Github Information!`, avatar_url)
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "No Bio"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "No Location"}`)
            .addField(`Link to ${login}'s Github`, `https://github.com/DarkPhoenixReborn`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`Requested by: ${message.author.username}`)
            .setURL("https://github.com/DarkPhoenixReborn")

            message.channel.send(embed)

    } else if (args[0] == `PartyAnimalGit`) {

        const em = new MessageEmbed()
        .setAuthor(`Party Animals Github Code`)
        .setColor("RED")
        .addField(`Author Username`, `${login}`)
        .addField(`Link to Bot Author's Github`, `https://github.com/ArkanReborn`)
        .addField(`Link to my available code`, `https://github.com/ArkanReborn/Party-Animals`)
        .setURL(`https://github.com/DarkPhoenixReborn/Party-Animals`)
        
        message.channel.send(em)
    }
    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.channel.send(`Something Went Wrong Try Again Later!`)
        }
    }
};
