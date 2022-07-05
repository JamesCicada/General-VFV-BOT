const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("flip a coin and try your luck")
        .addIntegerOption((option) =>
            option
                .setName("many")
                .setDescription("how many 𝒱s do you wanna use")
                .setMinValue(100)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("choice")
                .setDescription("H = Heads / T = Tails")
                .addChoices(
                    { name: "h", value: "h" },
                    { name: "t", value: "t" }
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        let username = interaction.user.username;
        let bet = interaction.options.getInteger("many");
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let chance = Math.round(Math.random() * 100) + 1;
        let choice = interaction.options.getString("choice");
        let old = ball.wallet;
        let left = ball.coinflipLeft;
        let date = new Date().now;
        let nowDate = moment(new Date().now).format();
        let expired = moment(date).add({ hours: 1 }).format();
        let checkTimeout = await ball.coinflipCooldown;
        let timeLeft = await moment(checkTimeout).diff(nowDate, "minutes");

        try {
            if (!left || left == 0) {
                interaction.reply(
                    `you need to wait ${timeLeft} minutes before you try 5 more times`
                );
            } else {
                let result;
                if (chance >= 50) {
                    result = "t";
                } else {
                    result = "h";
                }
                console.log(result);
                if (old >= bet) {
                    if (result == choice) {
                        await memberSchema.findOneAndUpdate(
                            { discordId: userId },
                            { wallet: old + bet, coinflipLeft: left - 1 }
                        );
                        await interaction.reply(
                            `Jeez ma boiii you won ${
                                bet * 2
                            } 🤩 your balance is \n Bank : ${
                                ball.ballance
                            }𝒱  \n wallet: ${ball.wallet + bet}𝒱`
                        );
                        if (left == 1) {
                            await memberSchema.findOneAndUpdate(
                                { discordId: userId },
                                {
                                    coinflipCooldown: expired,
                                }
                            );
                        }
                    } else {
                        await memberSchema.findOneAndUpdate(
                            { discordId: userId },
                            { wallet: old - bet }
                        );
                        await interaction.reply(
                            `unlucky man your choice was ${choice} and it was actually ${result} just lost ${bet} 😕 your balance is \n Bank : ${
                                ball.ballance
                            }𝒱  \n wallet: ${ball.wallet - bet}𝒱`
                        );
                    }
                } else {
                    interaction.reply("psst...you don't have that much bro 🤦‍♂️");
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
};
