const fs = require("fs");
const getFiles = require("./get-files");
module.exports = (client) => {
    const commands = {};
    const suffix = ".js";

    const commandFiles = getFiles("./legacyCommands", suffix);
    console.log(commandFiles);

    for (const command of commandFiles) {
        let commandFile = require(command);
        if (commandFile.default) commandFile = commandFile.default;

        const split = command.replace(/\\/g, "/").split("/");
        const commandName = split[split.length - 1].replace(suffix, "");

        commands[commandName.toLowerCase()] = commandFile;
    }

    console.log(commands);

    client.on("messageCreate", (message) => {
        if (message.author.bot || !message.content.startsWith("v!")) {
            return;
        }

        const args = message.content.slice(2).split(/ +/);
        const commandName = args.shift().toLowerCase();
        if (!commands[commandName]) {
            return;
        }

        try {
            commands[commandName].callback(message, ...args);
        } catch (error) {
            console.error(error);
        }
    });
};
