const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("deposit")
        .setDescription("put your money in the bank")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many 𝒱 points do you wanna deposite")
                .setRequired(true)
                .setMinValue(10)
        ),
    async execute(interaction) {
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let Much = interaction.options.getInteger("number");
        //console.log(ball.cooldown);
        let userDBDB = interaction.user;

        try {
            if (ball.wallet >= Much) {
                let oldWallet = ball.wallet;
                let oldBallance = ball.ballance;

                await memberSchema.findOneAndUpdate(
                    { discordId: userId },
                    { wallet: oldWallet - Much, ballance: oldBallance + Much }
                );
                await interaction.reply(
                    `${userDBDB} ${Much}𝒱  was added to your bank account`
                );
            } else {
                interaction.reply(
                    `${userDBDB} you don't have tha much money kiddo`
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
