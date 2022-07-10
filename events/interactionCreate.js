const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");

module.exports = {
    name: "interactionCreate",
    ////////////////////
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        let userId;
        let ball;
        let guildId = interaction.guild.id;
        //let memberId;
        let ownerCheck = interaction.guild.ownerId;
        let isOwner;
        //console.log(ownerCheck);
        try {
            if (!interaction.options.getUser("user")) {
                username = interaction.user.username;
                userId = interaction.user.id;
                //memberId = interaction.member.id;
            } else {
                username = interaction.options.getUser("user").username;
                userId = interaction.options.getUser("user").id;
                //memberId = interaction.options.getMember("user").id;
            }
            ball = await memberSchema.findOne({ discordId: userId });
            if (!ball) {
                if (userId == ownerCheck) {
                    isOwner = true;
                } else {
                    isOwner = false;
                }
                //console.log(username.username);
                await new memberSchema({
                    username: username,
                    discordId: userId,
                    ballance: 1000,
                    begTimeout: 0,
                    guildId: guildId,
                    isOwner: isOwner,
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
