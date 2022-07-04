const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("givecash")
        .setDescription("give your friend cash")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many 𝒱 points do you wanna give them")
                .setRequired(true)
                .setMinValue(10)
        )
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("the member you wanna give money to")
                .setRequired(true)
        ),
    async execute(interaction) {
        let userId = interaction.user.id;
        let targetUser = interaction.options.getUser("target");
        let targetId = targetUser.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let targetBall = await memberSchema.findOne({ discordId: targetId });
        let Much = interaction.options.getInteger("number");

        //console.log(ball.cooldown);
        let userDBDB = interaction.user;

        try {
            if (ball.wallet >= Much) {
                let oldWallet = ball.wallet;
                //let oldBallance = ball.ballance;
                let oldTargetWallet = targetBall.wallet;

                await memberSchema.findOneAndUpdate(
                    { discordId: userId },
                    { wallet: oldWallet - Much }
                );
                await memberSchema.findOneAndUpdate(
                    { discordId: targetId },
                    { wallet: oldTargetWallet + Much }
                );
                await interaction.reply(
                    `${userDBDB} ${Much}𝒱  was given to ${targetUser}`
                );
            } else {
                interaction.reply(
                    `${userDBDB}  make sure you have money in your wallet before giving it to someone`
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
