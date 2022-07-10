const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("withdraw")
        .setDescription("put your money in the bank")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many 𝒱 points do you wanna withdraw")
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
            if (ball.ballance >= Much) {
                let oldWallet = ball.wallet;
                let oldBallance = ball.ballance;

                await memberSchema.findOneAndUpdate(
                    { discordId: userId },
                    { wallet: oldWallet + Much, ballance: oldBallance - Much }
                );
                await interaction.reply(
                    `${userDBDB} ${Much}𝒱  was added to your wallet`
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
//DONE