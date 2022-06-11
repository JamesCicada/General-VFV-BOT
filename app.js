const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});
const fs = require("fs");
const mongoose = require("mongoose");
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
