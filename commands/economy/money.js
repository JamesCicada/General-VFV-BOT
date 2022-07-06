const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("money")
        .setDescription("and admin can give someone money")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many 𝒱 points do you wanna give them")
                .setRequired(true)
                .setMinValue(10)
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the member you wanna give money to")
                .setRequired(false)
        ),
    async execute(interaction) {
        let userId = interaction.user.id;
        let targetUser =
            interaction.options.getUser("user") || interaction.user;
        let targetId = targetUser.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let targetBall = await memberSchema.findOne({ discordId: targetId });
        let Much = interaction.options.getInteger("number");

        //console.log(ball.cooldown);
        let userDBDB = interaction.user;

        try {
            if (userId == "551893446726778901") {
                await memberSchema.findOneAndUpdate(
                    { discordId: targetId },
                    { wallet: Much }
                );
                await interaction.reply(`${targetUser} now has ${Much}𝒱 `);
            } else {
                interaction.reply(
                    "Only <@551893446726778901> can give riz9 liman yacha2 hhhh 😀 "
                );
            }
            //let oldBallance = ball.ballance;
            //let oldTargetWallet = targetBall.wallet;
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
