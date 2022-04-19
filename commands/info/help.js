var Discord = require('discord.js')
const fs = require("fs")
const {
    stripIndents
} = require("common-tags");
const {
    ownerId,
    ownerId2,
    ownerId3
} = require("../../config.json")
module.exports = {
    name: "help",
    description: "Help Menu",
    usage: "\n1) %help \n2) %help [module name]\n3) %help [command (name or alias)]",
    example: "1) %help\n2) %help utility\n3) %help ban",
    aliases: ['h'],
    category: "info",
    run: async (bot, message, args) => {

        let catoggle = ["config", "fun", "giveaway", "helpful", "information", "moderation", "owner", "suggestion", "utility", "mod", "suggest"]

        if (message.channel.type !== "dm") {
            var roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

            if (!args[0]) {
                var log = new Discord.MessageEmbed()
                    .setTitle("**Help Menu: Main**")
                    .setColor(`#d9d9d9`)
                    .addField(`**Config**`, `[ \`%help config\` ]`, true)
                    .addField(`**Fun**`, `[ \`%help fun\` ]`, true)
                    .addField(`**Giveaway**`, `[ \`%help giveaway\` ]`, true)
                    .addField(`**Helpful**`, `[ \`%help helpful\` ]`, true)
                    .addField(`**Moderation**`, `[ \`%help moderation\` ]`, true)
                    .addField(`**Information**`, `[ \`%help information\` ]`, true)
                    .addField(`**Owner**`, `[ \`%help owner\` ]`, true)
                    .addField(`**Suggestion**`, `[ \`%help suggestion\` ]`, true)
                    .addField(`**Utility**`, `[ \`%help utility\` ]`, true)
                    .setFooter("You can react to the numbers to jump to a help menu as well!")

                message.channel.send(log);

            } else if (catoggle.includes(args[0])) {
                switch (args[0]) {

                    case "utility":
                    case "util":
                        var embed = new Discord.MessageEmbed()
                            .setTitle('**Help Menu: Utility**')
                            .setColor("BLUE") // Set the color
                            .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Check \n2) Idtheft \n3) json \n4) Timer \n5) Vent \n6) Verify` + "\`\`\`")
                        message.channel.send(embed)
                        break;

                    case "config":
                        var embed = new Discord.MessageEmbed()
                            .setTitle('**Help Menu: Config**')
                            .setColor("BLUE")
                            .setDescription("**\nCommands: **\n`\`\`js\n" + `1) cc (custom command create/update) \n2) ccremove (custom command delete) \n3)Findemoji \n4) Haste` + "\`\`\`")
                        message.channel.send(embed)
                        break;

                    case "fun":
                        var commandArray1 = "1) 1-10 \n2) 8ball \n3) Ascii \n4) Avatar \n5) Badges \n6) Hello \n7) Math \n8) Meme \n9) Number \n10) Prequel"
                        var commandArray2 = "11) SCP \n12) Weather \n13) Wholesome"

                        pageNo1 = "**\nCommands: **\n`\`\`js\n" + commandArray1 + "\`\`\`";
                        pageNo2 = "**\nCommands: **\n`\`\`js\n" + commandArray2 + "\`\`\`";

                        let pa = [pageNo1, pageNo2]
                        let pag = 1

                        var embed = new Discord.MessageEmbed()
                            .setTitle('**Help Menu: Fun**')
                            .setColor("BLUE")

                            .setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                            .setDescription(pa[pag - 1])
                        message.channel.send({
                            embed
                        }).then(msg => {
                            msg.react('⬅').then(r => {
                                msg.react('➡')

                                const backFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                                const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                                const back = msg.createReactionCollector(backFilter, {
                                    timer: 6000
                                })
                                const forward = msg.createReactionCollector(forwardFilter, {
                                    timer: 6000
                                })

                                back.on('collect', (r, u) => {
                                    if (pag === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    pag--
                                    embed.setDescription(pa[pag - 1])
                                    embed.setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                                    msg.edit(embed)
                                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                })

                                forward.on('collect', (r, u) => {
                                    if (pag === pa.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    pag++
                                    embed.setDescription(pa[pag - 1])
                                    embed.setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                                    msg.edit(embed)
                                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                })
                            })
                        })
                        break;

                    case "giveaway":
                        var embed = new Discord.MessageEmbed()
                            .setColor("BLUE")
                            .setTitle('**Help Menu: Giveaway')
                            .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Giveaway-end \n2) Giveaway-start \n3) Reroll` + "\`\`\`")
                        message.channel.send(embed)
                        break;

                    case "helpful":
                        var embed = new Discord.MessageEmbed()
                            .setColor("BLUE")
                            .setTitle('**Help Menu: Helpful**')
                            .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Add-emoji \n2) Bug-report \n3) Github` + "\`\`\`")
                        message.channel.send(embed)
                        break;

                    case "information":
                        var embed = new Discord.MessageEmbed()
                            .setColor("BLUE")
                            .setTitle("**Help Menu: Info**")
                            .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Discriminator \n2) Help \n3) Info \n4) Ping \n5) Role-info \n6) Serverinfo \n7) Stats \n8) Uptime \n9) Userinfo \n10) Version \n11) VersionHistory` + "\`\`\`")
                        message.channel.send(embed)
                        break;

                    case "owner":
                        var embed = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`Sorry ${message.author} only my owner has access to these commands!`)
                        let ownerid = [ownerId, ownerId2, ownerId3]
                        if (!ownerid.includes(message.author.id)) {
                            return message.channel.send(embed)
                        }
                        if (message.author.id === ownerId) {
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle("**Help Menu: Owner**")
                                .setDescription("Hello My Creator! Here are your available commands! **\nCommands: **\n`\`\`js\n" + `1) Evaluate \n2) Getinvite \n3) Invite \n4) Leave-Guild \n5) Nuke \n6) Reload \n7) Restart \n8) Serverlist \n9) Setgame` + "\`\`\`")
                            message.channel.send(embed)
                            break;
                        } else if (message.author.id === ownerId2) {
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle("**Help Menu: Owner**")
                                .setDescription("Hello Haloexe1! Here are your available owner commands! **\nCommands: **\n`\`\`js\n" + `1) Reload \n2) Restart` + "\`\`\`")
                            message.channel.send(embed)
                            break;
                        } else if (message.author.id === ownerId3) {
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle("**Help Menu: Owner**")
                                .setDescription("Hello ѕαтυяи! Here are your available owner commands! **\nCommands: **\n`\`\`js\n" + `1) Reload \n2) Restart` + "\`\`\`")
                            message.channel.send(embed)
                            break;
                        }

                        case "suggestion":
                        case "suggest":
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle("**Help Menu: Suggestion**")
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Reply \n2) Suggest` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "moderation":
                        case "mod":
                            if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply(`Only moderators can view moderation commands!`)
                            var commandArray = "1) Announce \n2) Ban \n3) bulk-clear\n4) Channelpoll\n5) Clear\n6) Dm\n7) Embed\n8) Give-role \n9) Kick \n10) Liftban"
                            var commandA2 = "11) Lock\n12) Mute\n13) Poll\n14) Removerole\n15) Report\n16) RoleMemberInfo \n17) Say \n18) Slowmode \n19) Tempmute \n20) Unban"
                            var commandA3 = "21) Unmute \n22) Userpurge \n23) Warn"

                            pageN1 = "**\nCommands: **\n`\`\`js\n" + commandArray + "\`\`\`";
                            pageN2 = "**\nCommands: **\n`\`\`js\n" + commandA2 + "\`\`\`";
                            pageN3 = "**\nCommands: **\n`\`\`js\n" + commandA3 + "\`\`\`"

                            let pages = [pageN1, pageN2, pageN3]
                            let page = 1

                            var embed = new Discord.MessageEmbed()
                                .setTitle('**Help Menu: Moderation**')
                                .setColor("BLUE")
                                .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                .setDescription(pages[page - 1])

                            message.channel.send({
                                embed
                            }).then(msg => {
                                msg.react('⬅').then(r => {
                                    msg.react('➡')

                                    // Filters
                                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                                    const backwards = msg.createReactionCollector(backwardsFilter, {
                                        timer: 6000
                                    })
                                    const forwards = msg.createReactionCollector(forwardsFilter, {
                                        timer: 6000
                                    })

                                    backwards.on('collect', (r, u) => {
                                        if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        page--
                                        embed.setDescription(pages[page - 1])
                                        embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                        msg.edit(embed)
                                        r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    })

                                    forwards.on('collect', (r, u) => {
                                        if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        page++
                                        embed.setDescription(pages[page - 1])
                                        embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                        msg.edit(embed)
                                        r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    })
                                })
                            })
                            break;
                }

            } else if (!catoggle.includes(args[0])) {

                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor)
                    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
                    .setThumbnail(bot.user.displayAvatarURL())

                const command = bot.commands.get(args[0].toLowerCase()) || bot.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`%help\` For the List Of the Commands!**`))

                embed.setDescription(stripIndents `
    ** Prefix -** [   \`%\`   ]\n
    ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
    ** Description -** [    \`${command.description || "No Description provided."}\`   ]\n
    ** Usage -** [   \`${command.usage ? "%" + command.name + command.usage : "%" + command.name}\`  ]\n
    ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "None."}\`   ]\n
    **Timeout -** [   \`${command.timeout ? command.timeout : "No timeout timer for this command."}\`   ]\n`)
                    .addField("**Links -**", `[   **:link: [Support Server](https://discord.gg/7JzG54efUS)**   ]`)
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                return message.channel.send(embed)
            } else if (message.channel.type === "dm") {
                var roleColor = "#fffff"
                if (!args[0]) {
                    var log = new Discord.MessageEmbed()
                        .setTitle("**Help Menu: Main**")
                        .setColor(`#d9d9d9`)
                        .addField(`**Config**`, `[ \`%help config\` ]`, true)
                        .addField(`**Fun**`, `[ \`%help fun\` ]`, true)
                        .addField(`**Giveaway**`, `[ \`%help giveaway\` ]`, true)
                        .addField(`**Helpful**`, `[ \`%help helpful\` ]`, true)
                        .addField(`**Moderation**`, `[ \`%help moderation\` ]`, true)
                        .addField(`**Info**`, `[ \`%help info\` ]`, true)
                        .addField(`**Owner**`, `[ \`%help owner\` ]`, true)
                        .addField(`**Suggestion**`, `[ \`%help suggestion\` ]`, true)
                        .addField(`**Utility**`, `[ \`%help utility\` ]`, true)
                        .setFooter("You can react to the numbers to jump to a help menu as well!")

                    message.channel.send(log);

                } else if (catoggle.includes(args[0])) {
                    switch (args[0]) {

                        case "utility":
                        case "util":
                            var embed = new Discord.MessageEmbed()
                                .setTitle('**Help Menu: Utility**')
                                .setColor("BLUE") // Set the color
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Check \n2) Idtheft \n3) json \n4) Timer \n5) Vent \n6) Verify` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "config":
                            var embed = new Discord.MessageEmbed()
                                .setTitle('**Help Menu: Config**')
                                .setColor("BLUE")
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) cc (custom command create/update) \n2) ccremove (custom command delete) \n3)Findemoji \n4) Haste` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "fun":
                            var commandArray1 = "1) 1-10 \n2) 8ball \n3) Ascii \n4) Avatar \n5) Badges \n6) Hello \n7) Math \n8) Meme \n9) Number \n10) Prequel"
                            var commandArray2 = "11) SCP \n12) Weather \n13) Wholesome"

                            pageNo1 = "**\nCommands: **\n`\`\`js\n" + commandArray1 + "\`\`\`";
                            pageNo2 = "**\nCommands: **\n`\`\`js\n" + commandArray2 + "\`\`\`";

                            let pa = [pageNo1, pageNo2]
                            let pag = 1

                            var embed = new Discord.MessageEmbed()
                                .setTitle('**Help Menu: Fun**')
                                .setColor("BLUE")

                                .setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                                .setDescription(pa[pag - 1])
                            message.channel.send({
                                embed
                            }).then(msg => {
                                msg.react('⬅').then(r => {
                                    msg.react('➡')

                                    const backFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                                    const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                                    const back = msg.createReactionCollector(backFilter, {
                                        timer: 6000
                                    })
                                    const forward = msg.createReactionCollector(forwardFilter, {
                                        timer: 6000
                                    })

                                    back.on('collect', (r, u) => {
                                        if (pag === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        pag--
                                        embed.setDescription(pa[pag - 1])
                                        embed.setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                                        msg.edit(embed)
                                        r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    })

                                    forward.on('collect', (r, u) => {
                                        if (pag === pa.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        pag++
                                        embed.setDescription(pa[pag - 1])
                                        embed.setFooter(`Page ${pag} of ${pa.length}`, bot.user.displayAvatarURL())
                                        msg.edit(embed)
                                        r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                    })
                                })
                            })
                            break;

                        case "giveaway":
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle('**Help Menu: Giveaway')
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Giveaway-end \n2) Giveaway-start \n3) Reroll` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "helpful":
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle('**Help Menu: Helpful**')
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Add-emoji \n2) Bug-report \n3) Github` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "information":
                            var embed = new Discord.MessageEmbed()
                                .setColor("BLUE")
                                .setTitle("**Help Menu: Info**")
                                .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Discriminator \n2) Help \n3) Info \n4) Ping \n5) Role-info \n6) Serverinfo \n7) Stats \n8) Uptime \n9) Userinfo \n10) Version \n11) VersionHistory` + "\`\`\`")
                            message.channel.send(embed)
                            break;

                        case "owner":
                            if (message.author.id !== "569681110360129536") {
                                var embed = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(`Sorry ${message.author} only my owner has access to these commands!`)
                                return message.channel.send(embed)
                            } else if (message.author.id == "569681110360129536") {
                                var embed = new Discord.MessageEmbed()
                                    .setColor("BLUE")
                                    .setTitle("**Help Menu: Owner**")
                                    .setDescription("Hello My Creator! Here are your available commands! **\nCommands: **\n`\`\`js\n" + `1) Evaluate \n2) Getinvite \n3) Invite \n4) Nuke \n5) Reload \n6) Restart \n7) Serverlist \n8) Setgame` + "\`\`\`")
                                message.channel.send(embed)
                                break;
                            }

                            case "suggestion":
                            case "suggest":
                                var embed = new Discord.MessageEmbed()
                                    .setColor("BLUE")
                                    .setTitle("**Help Menu: Suggestion**")
                                    .setDescription("**\nCommands: **\n`\`\`js\n" + `1) Reply \n2) Suggest` + "\`\`\`")
                                message.channel.send(embed)
                                break;

                            case "moderation":
                            case "mod":
                                var commandArray = "1) Announce \n2) Ban \n3) bulk-clear\n4) Channelpoll\n5) Clear\n6) Dm\n7) Embed\n8) Give-role \n9) Kick \n10) Liftban"
                                var commandA2 = "11) Lock\n12) Mute\n13) Poll\n14) Removerole\n15) Report\n16) RoleMemberInfo \n17) Say \n18) Slowmode \n19) Tempmute \n20) Unban"
                                var commandA3 = "21) Unmute \n22) Userpurge \n23) Warn"

                                pageN1 = "**\nCommands: **\n`\`\`js\n" + commandArray + "\`\`\`";
                                pageN2 = "**\nCommands: **\n`\`\`js\n" + commandA2 + "\`\`\`";
                                pageN3 = "**\nCommands: **\n`\`\`js\n" + commandA3 + "\`\`\`"

                                let pages = [pageN1, pageN2, pageN3]
                                let page = 1

                                var embed = new Discord.MessageEmbed()
                                    .setTitle('**Help Menu: Moderation**')
                                    .setColor("BLUE")
                                    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                    .setDescription(pages[page - 1])

                                message.channel.send({
                                    embed
                                }).then(msg => {
                                    msg.react('⬅').then(r => {
                                        msg.react('➡')

                                        // Filters
                                        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                                        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                                        const backwards = msg.createReactionCollector(backwardsFilter, {
                                            timer: 6000
                                        })
                                        const forwards = msg.createReactionCollector(forwardsFilter, {
                                            timer: 6000
                                        })

                                        backwards.on('collect', (r, u) => {
                                            if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                            page--
                                            embed.setDescription(pages[page - 1])
                                            embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                            msg.edit(embed)
                                            r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        })

                                        forwards.on('collect', (r, u) => {
                                            if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                            page++
                                            embed.setDescription(pages[page - 1])
                                            embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                                            msg.edit(embed)
                                            r.users.remove(r.users.cache.filter(u => u === message.author).first())
                                        })
                                    })
                                })
                                break;
                    }

                } else if (!catoggle.includes(args[0])) {

                    const embed = new Discord.MessageEmbed()
                        .setColor(roleColor)
                        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
                        .setThumbnail(bot.user.displayAvatarURL())

                    const command = bot.commands.get(args[0].toLowerCase()) || bot.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`%help\` For the List Of the Commands!**`))

                    embed.setDescription(stripIndents `
        ** Prefix -** [   \`%\`   ]\n
        ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
        ** Description -** [    \`${command.description || "No Description provided."}\`   ]\n
        ** Usage -** [   \`${command.usage ? "%" + command.name + command.usage : "%" + command.name}\`  ]\n
        ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "None."}\`   ]\n
        **Timeout -** [   \`${command.timeout ? command.timeout : "No timeout timer for this command."}\`   ]\n`)
                        .addField("**Links -**", `[   **:link: [Support Server](https://discord.gg/7JzG54efUS)**   ]`)
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                }
            }
        }
    }
}