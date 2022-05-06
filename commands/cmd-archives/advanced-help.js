const {
  MessageEmbed,
  Discord
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const db = require("../db");
const sourcebin = require("sourcebin_js");

module.exports = {
  name: "advhelp",
  category: "Work in Progress",
  aliases: ["ahp"],
  description: "This command is still under construction please wait",
  run: async (client, message, args) => {

    if (message.author.id !== "569681110360129536") return message.reply(`you cannot use this command!`);

    const conf = [];
    readdirSync("./commands/config/").forEach((dir) => {
      const cmdcat = readdirSync(`./commands/config/${dir}`).filter((file) =>
        file.endsWith(".js")
      );

      const concmd = cmdcat.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Config",
        value: concmd.length === 0 ? "In progress." : concmd.join(" "),
      };

      conf.push(data);
      if (conf.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });
/*
    const econ = [];
    readdirSync("./commands/").forEach((dir) => {
      const cmdcat2 = readdirSync(`./commands/economy/`).filter((file) =>
        file.endsWith(".js")
      );

      const econcmd = cmdcat2.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Economy",
        value: econcmd.length === 0 ? "In progress." : econcmd.join(" "),
      };

      econ.push(data);
      if (econ.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const funs = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = fun
      const cmdcat3 = readdirSync(`./commands/fun/`).filter((file) =>
        file.endsWith(".js")
      );

      const funcat = cmdcat3.map((command) => {
        let file = require(`../../commands/fun/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Fun",
        value: funcat.length === 0 ? "In progress." : funcat.join(" "),
      };

      funs.push(data);
      if (funs.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const givea = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = giveaway
      const cmdcat4 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const givecat = cmdcat4.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Giveaway",
        value: givecat.length === 0 ? "In progress." : givecat.join(" "),
      };

      givea.push(data);
      if (givea.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const helpfull = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = helpful
      const cmdcat5 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const helpcat = cmdcat5.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Helpful",
        value: helpcat.length === 0 ? "In progress." : helpcat.join(" "),
      };

      helpfull.push(data);
      if (helpfull.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const inform = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = info
      const cmdcat6 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const infocat = cmdcat6.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Info",
        value: infocat.length === 0 ? "In progress." : infocat.join(" "),
      };

      inform.push(data);
      if (inform.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const moderate = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = moderation
      const cmdcat7 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const modcat = cmdcat7.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Moderation",
        value: modcat.length === 0 ? "In progress." : modcat.join(" "),
      };

      moderate.push(data);
      if (moderate.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const own = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = owner
      const cmdcat8 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const ownercat = cmdcat8.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Owner",
        value: ownercat.length === 0 ? "In progress." : ownercat.join(" "),
      };

      own.push(data);
      if (own.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const suggest = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = suggestion
      const cmdcat9 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const sugcmd = cmdcat9.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Suggestion",
        value: sugcmd.length === 0 ? "In progress." : sugcmd.join(" "),
      };

      suggest.push(data);
      if (suggest.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });

    const utili = [];
    readdirSync("./commands/").forEach((dir) => {
      var dir = utility
      const cmdcat10 = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const utilcmd = cmdcat10.map((command) => {
        let file = require(`../../commands/${dir}/${command}`)

        if (!file.name) return "No command name."

        let name = file.name.replace(".js", "")

        return `\`| ${name} |\``
      })
      let data = new Object();

      data = {
        name: "Utility",
        value: utilcmd.length === 0 ? "In progress." : utilcmd.join(" "),
      };

      utili.push(data);
      if (utili.length > 1024) {
        sourcebin
          .create([{
            title: "JavaScript code",
            description: 'This code was created in "' + message.createdAt + '"',
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }])
      }
    });
*/

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    const helpembed = new MessageEmbed()
      .setTitle("📬 Need help?")
      .setDescription(`Welcome to my help page! Please use the arrows attached to this message to navigate my command categories!\n\nOr use \`%help\` followed by a command name to get more additional information on a command. For example: \`%help info\`.`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .addField(`Command Pages`, `Page 2: Config \nPage 3: Economy \n Page 4: Fun \nPage 5: Giveaway \nPage 6: Helpful \nPage 7: Info \nPage 8: Moderation \nPage 9: Suggestion \nPage 10: Utility \nPage 11: Owner`)
      .addField(`Page:`, `1/11`)
      .setTimestamp()
      .setColor("BLUE");
    const msg = await message.channel.send(helpembed)

    await msg.react("⬅")
    await msg.react("➡")

    const p1 = new MessageEmbed()
      .setTitle("Page 2: Config")
      .addField(conf)
      .setDescription(`Welcome to my config help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 2/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))
/*
    const p2 = new MessageEmbed()
      .setTitle("Page 3: Economy")
      .addField(econ)
      .setDescription(`Welcome to my economy help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 3/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p3 = new MessageEmbed()
      .setTitle("Page 4: Fun")
      .addField(funs)
      .setDescription(`Welcome to my fun help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 4/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p4 = new MessageEmbed()
      .setTitle("Page 5: Giveaway")
      .addField(givea)
      .setDescription(`Welcome to my giveaway help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 5/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p5 = new MessageEmbed()
      .setTitle("Page 6: Helpful")
      .addField(helpfull)
      .setDescription(`Welcome to my helpful category! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 6/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p6 = new MessageEmbed()
      .setTitle("Page 7: Info")
      .addField(inform)
      .setDescription(`Welcome to my info help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 7/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p7 = new MessageEmbed()
      .setTitle("Page 8: Moderation")
      .addField(moderate)
      .setDescription(`Welcome to my moderation help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 8/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p8 = new MessageEmbed()
      .setTitle("Page 9: Suggestion")
      .addField(suggest)
      .setDescription(`Welcome to my suggestion help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 9/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p9 = new MessageEmbed()
      .setTitle("Page 10: Utility")
      .addField(utili)
      .setDescription(`Welcome to my utility help! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 10/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))

    const p10 = new MessageEmbed()
      .setTitle("Page 11: Owner")
      .addField(own)
      .setDescription(`Welcome to my owner command help only my owner can use these commands! Please use %help <command name> at any point to get information on a command!`)
      .setColor("BLUE")
      .addField(`Page: 11/11`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      */

    let collector = msg.createReactionCollector(
      (reaction, user) => user.id === message.author.id
    );

    collector.on("collect", async (reaction, user) => {
      if (reaction._emoji.name === "⬅") {

        i0 = i0 - 11;
        i1 = i1 - 11;
        page = page - 1;

        if (i0 + 1 < 0) {
          console.log(i0)
          return msg.delete();
        } else if (!i0 || !i1) {
          return msg.delete()
        }

        if (page == "1") {
          msg.edit(helpembed)
        } else if (page == "2") {
          msg.edit(p1)
        }/* else if (page == "3") {
          msg.edit(p2)
        } else if (page == "4") {
          msg.edit(p3)
        } else if (page == "5") {
          msg.edit(p4)
        } else if (page == "6") {
          msg.edit(p5)
        } else if (page == "7") {
          msg.edit(p6)
        } else if (page == "8") {
          msg.edit(p7)
        } else if (page == "9") {
          msg.edit(p8)
        } else if (page == "10") {
          msg.edit(p9)
        } else if (page == "11") {
          msg.edit(p10)
        } else if (page > "11") {
          msg.edit(p10)
        } else if (page < "1") {
          msg.edit(helpembed)
        } */

      }
      if (reaction._emoji.name === "➡") {

        i0 = i0 + 11;
        i1 = i1 + 11;
        page = page + 1;
      } else if (!i0 || !i1) {
        return msg.delete()
      }

      if (page == "1") {
        msg.edit(helpembed)
      } else if (page == "2") {
        msg.edit(p1) 
      } /* else if (page == "3") {
        msg.edit(p2)
      } else if (page == "4") {
        msg.edit(p3)
      } else if (page == "5") {
        msg.edit(p4)
      } else if (page == "6") {
        msg.edit(p5)
      } else if (page == "7") {
        msg.edit(p6)
      } else if (page == "8") {
        msg.edit(p7)
      } else if (page == "9") {
        msg.edit(p8)
      } else if (page == "10") {
        msg.edit(p9)
      } else if (page == "11") {
        msg.edit(p10)
      } else if (page > "11") {
        msg.edit(p10)
      } else if (page < "1") {
        msg.edit(helpembed)
      } */
    }) 
  }
}