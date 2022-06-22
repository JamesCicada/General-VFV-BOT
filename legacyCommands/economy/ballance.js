const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ballance")
        .setDescription("shows you our ballance"),
    async execute(interaction) {
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        try {
            if (!ball) {
                await new memberSchema({
                    username: username,
                    discordId: userId,
                    ball: 1000,
                })
                    .save()
                    .then(
                        await interaction.reply(
                            `your ballance is \n Bank : 1000  \n wallet: 100`
                        )
                    );
                console.log(ball);
            } else {
                await memberSchema.findOne({ ball: userId });
                await interaction.reply(
                    `your ballance is \n Bank : ${memberSchema.ballance}  \n wallet: ${memberSchema.wallet}`
                );
                //console.log(ballance);
            }
        } catch (err) {
            console.log(err);
        }
    },
};
