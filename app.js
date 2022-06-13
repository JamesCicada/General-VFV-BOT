const { channel } = require("diagnostics_channel");
const { Client, Intents, Collection } = require("discord.js");
const randomColor = require("randomcolor");
const client = new Client({
    presence: {
        status: "idle",
        afk: false,
        activities: [
            {
                name: "VENDETTA",
                type: "WATCHING",
            },
        ],
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ["CHANNEL"],
});
const fs = require("fs");
const mongoose = require("mongoose");
const guildMemberAdd = require("./events/guildMemberAdd");
require("dotenv").config();

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
        message.reply(
            "someone will contact you as soon as possible \n make sure you described the problem and don't spam"
        );
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
                        text: `𝐕𝐅𝐕 | 𝐕 𝐅𝐎𝐑 𝐕𝐄𝐍𝐃𝐄𝐓𝐓𝐀`,
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
  let handler = require('./command-handler')
  if (handler.default) handler = handler.default

  handler(client)
  await mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true,

  })
  //client.channels.cache.get('825529224206876682').send("Hi! I'm online :)")
  console.log('the bot is online')
  client.user.setActivity(`v!help`, { type: "WATCHING" });
  
});*/
