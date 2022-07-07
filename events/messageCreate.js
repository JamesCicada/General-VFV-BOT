const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
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
            let xp = 5;
            await memberSchema.findOneAndUpdate(
                { discordId: userId },
                { textXp: oldXp + xp }
            );
            console.log("he took xp lol");
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
