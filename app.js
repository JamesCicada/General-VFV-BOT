const { Client, Intents, Collection } = require("discord.js");
const randomColor = require("randomcolor");
const client = new Client({
    presence: {
        status: "idle",
        afk: false,
        activities: [
            {
                name: "7HE SE7EN",
                type: "WATCHING",
            },
        ],
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ["CHANNEL"],
});
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const testSchema = require("./Schemas/addToDB");
const vcSchema = require("./Schemas/vcSchema");

client.voiceGenerator = new Collection();

/*client.on("voiceStateUpdate", (oldState, newState) => {
    try {
        if (
            oldState.voiceChannel !== 992179944912339056 &&
            newState.voiceChannel === 992179944912339056
        ) {
            console.log("joined");
        }
        if (newState.channelID === null)
            //left
            console.log("user left channel", oldState.channelID);
        else if (oldState.channelID === null)
            // joined
            console.log("user joined channel", newState.channelID);
        // moved
        else
            console.log(
                "user moved channels",
                oldState.channelID,
                newState.channelID
            );
        if (
            oldState.channelID !== 992179944912339056 &&
            newState.channelID === 992179944912339056
        ) {
            console.log("joined");
        }
    } catch (err) {
        console.log(err);
    }
});*/
module.exports = client;

client.commands = new Collection();

const functions = fs
    .readdirSync("./functions")
    .filter((file) => file.endsWith(".js"));
const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands");
    client.login(process.env.TOKEN);
})();

client.on("messageCreate", async (message) => {
    const attachment = message.attachments.first();
    if (message.author.bot) return;
    if (message.channel.type === "DM") {
        console.log(message.content);
        let color = randomColor().slice(1);
        let embed = {
            embeds: [
                {
                    type: "rich",
                    title: `${message.author.tag} dmed the bot and said: `,
                    description: " ",
                    color: color,
                    fields: [
                        {
                            name: `User's id: ${message.author.id}`,
                            value: `this is the user who sent the message`,
                        },
                    ],
                    fields: [
                        {
                            name: `${message.content}`,
                            value: `that's the message they sent`,
                        },
                    ],
                    image: {
                        url: message.author.displayAvatarURL({
                            size: 1024,
                            dynamic: true,
                        }),
                    },
                    footer: {
                        text: `𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡`,
                        icon_url: `https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024`,
                    },
                },
            ],
        };
        if (message.attachments.size !== 0) {
            embed.setImage();
        }

        client.channels.fetch("985773188753547334").then((channel) => {
            channel.send(embed);
        });
    }
});
/*client.on("messageCreate", (msg) => {
    if (msg.channel.type === "dm") {
        console.log(msg);
        guild("825526271311478824")
            .channels.cache.get("985773188753547334")
            .send(`${msg} \n message from ${msg.author}`);
    }
});*/
/*client.on('ready', async () => {

  
});*/
