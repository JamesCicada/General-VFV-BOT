const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rob")
        .setDescription("give your friend cash")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the member you wanna rob")
                .setRequired(true)
        ),
    async execute(interaction) {
        let chance = Math.floor(Math.random() * 100);
        let userId = interaction.user.id;
        let targetUser = interaction.options.getUser("user");
        let targetId = targetUser.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let targetBall = await memberSchema.findOne({ discordId: targetId });
        let targetWallet = targetBall.wallet;
        let Much = Math.floor(Math.random() * 10000) + 100;
        let oldWallet = ball.wallet;
        //let oldBallance = ball.ballance;
        let oldTargetWallet = targetBall.wallet;
        //console.log(ball.cooldown);
        let userDBDB = interaction.user;
        //console.log(chance);

        try {
            if (!targetBall) {
                interaction.reply("this user is not in The DB lol");
            } else if (targetUser == userId) {
                interaction.reply(`😒 you can't rob yourself asshole`);
            } else if (oldTargetWallet <= 0 || oldTargetWallet <= Much) {
                interaction.reply(`${targetUser} is actually broke lol 😅`);
            } else {
                if (chance <= 30) {
                    await memberSchema.findOneAndUpdate(
                        { discordId: targetId },
                        { wallet: oldTargetWallet - Much }
                    );
                    await memberSchema.findOneAndUpdate(
                        { discordId: userId },
                        { wallet: oldWallet + Much }
                    );
                    interaction.reply(
                        `🤫 you stole ${Much} from ${targetUser}`
                    );
                } else {
                    await memberSchema.findOneAndUpdate(
                        { discordId: userId },
                        { wallet: oldWallet - Much }
                    );
                    await memberSchema.findOneAndUpdate(
                        { discordId: targetId },
                        { wallet: oldTargetWallet + Much }
                    );
                    interaction.reply(
                        `🤦‍♂️ you tried to steal from ${targetUser} but you were caught and paid ${Much}`
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
