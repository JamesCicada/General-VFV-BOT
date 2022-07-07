const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
const Levels = require("discord-xp");
require("dotenv").config();
Levels.setURL(
    "mongodb+srv://James:James2002@discord.xoems.mongodb.net/?retryWrites=true&w=majority"
);
module.exports = {
    name: "messageCreate",
    // add xp for every message
    async execute(message, client) {
        // Ignore all bots
        //const cooldowns = new Map();
        if (!message.author.bot) {
            let userId = message.author.id;
            let ball = await memberSchema.findOne({ discordId: userId });
            let oldXp = ball.textXp;
            let xp = Math.floor(Math.random() * 12) + 1;
            const hasLeveledUp = await Levels.appendXp(
                message.author.id,
                message.guild.id,
                xp
            );
            if (hasLeveledUp) {
                const user = await Levels.fetch(
                    message.author.id,
                    message.guild.id
                );
                message.channel.send(
                    `${message.author} 🎇🎉 congrats knee grow you just reached Level ${user.level} keep it going lil knee Gah 🎊`
                );
            }

            await memberSchema.findOneAndUpdate(
                { discordId: userId },
                { textXp: oldXp + xp }
            );
            //console.log("he took xp lol");
        }
        return;

        // Ignore messages not starting with the prefix (in config.json)

        // if (message.content.indexOf(client.config.prefix) !== 0) return;

        // Our standard argument/command name definition.
        //const args = message.content
        //.slice(client.config.prefix.length)
        //.trim()
        //.split(/ +/g);
        //const command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        //const cmd = client.commands.get(command);

        // If that command doesn't exist, silently exit and do nothing
        //if (!cmd) return;

        // Run the command
        //cmd.run(client, message, args);
    },
};
