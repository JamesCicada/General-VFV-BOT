const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
const URI = process.env.MONGO_URI;
const Levels = require("discord-xp");
const { MessageEmbed, CommandInteraction } = require("discord.js");
require("dotenv").config();
Levels.setURL(`${URI}`);
module.exports = {
    name: "messageCreate",
    // add xp for every message
    async execute(message) {
        const Embed = new MessageEmbed().setColor("RANDOM");
        try {
            if (!message.author.bot) {
                if (message.channel.isDmBased) {
                    if (message.guildId != "825526271311478824") {
                        try {
                            message.guild
                                .leave()
                                .then((g) =>
                                    console.log(`Left the guild ${g}`)
                                );
                        } catch (err) {
                            console.log(err);
                        }

                        /*channels
                        .get("983769673831161887")
                        .send(
                            `Created an invite with a code of discord.gg/${invite.code}`
                        )
                )
                .catch(console.error);*/
                    }
                } else {
                    if (
                        message.content == "server" ||
                        message.content == "invite"
                    ) {
                        message.reply("https://discord.gg/4X5TcQ3S29");
                    } else {
                        message.reply({
                            embeds: [
                                Embed.setDescription(
                                    "someone will contact you as soon as possible \n make sure you described the problem and don't spam(you can send **server** or **invite** to get invited to the server)"
                                ),
                            ],
                        });
                    }
                }
            } else return;

            if (!message.author.bot) {
                let userId = message.author.id;
                let ball = await memberSchema.findOne({ discordId: userId });
                let oldXp = ball.textXp;
                let xp = Math.floor(Math.random() * 12) + 1;
                const hasLeveledUp = await Levels.appendXp(
                    message.author.id,
                    message.guildId,
                    xp
                );
                if (hasLeveledUp) {
                    const user = await Levels.fetch(
                        message.author.id,
                        message.guildId
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
        } catch (err) {
            console.log(err);
        }
        // Ignore all bots
        //const cooldowns = new Map();
    },
};
