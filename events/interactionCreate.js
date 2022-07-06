const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
module.exports = {
    name: "interactionCreate",
    once: true,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        let userId;
        let ball;
        try {
            if (!interaction.options.getUser("user")) {
                username = interaction.user.username;
                userId = interaction.user.id;
            } else {
                username = interaction.options.getUser("user").username;
                userId = interaction.options.getUser("user").id;
            }
            ball = await memberSchema.findOne({ discordId: userId });
            if (!ball) {
                console.log(username.username);
                await new memberSchema({
                    username: username,
                    discordId: userId,
                    ballance: 1000,
                    begTimeout: 0,
                })
                    .save()
                    .then(console.log("added a user to db successffully"));
            }
        } catch (err) {
            console.log(err);
        }

        const command = client.commands.get(interaction.commandName);

        if (!command) return;
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    },
};
