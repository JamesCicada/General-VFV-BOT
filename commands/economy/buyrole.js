const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("buyrole")
        .setDescription("buy role with ID (run /shop to check IDs)")
        .addNumberOption((option) =>
            option
                .setName("id")
                .setDescription("the ID of the role you wanna buy")
                .setMaxValue(6)
                .setMinValue(1)
                .setRequired(true)
        ),
    async execute(interaction) {
        let member = interaction.member;
        //console.log(member);
        //let user = interaction.user;
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let poorRole = `983403235387793438`;
        let midRole = `983403601495986196`;
        let richRole = `983403813601939506`;
        let wealthyRole = `983403975854407781`;
        let gamblerRole = `983404427849400342`;
        let millionaire = `983404263101313115`;
        let checkRole = member.roles.chache;
        let oldWallet = ball.wallet;
        try {
            switch (interaction.options.getNumber("id")) {
                case 1:
                    if (!member.roles.cache.has(poorRole)) {
                        if (ball.wallet >= 1000) {
                            await member.roles.add(poorRole);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role remember no refund XD"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 1000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
                case 2:
                    if (!member.roles.cache.has(midRole)) {
                        if (ball.wallet >= 5000) {
                            await member.roles.add(midRole);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role remember no refund XD"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 5000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
                case 3:
                    if (!member.roles.cache.has(richRole)) {
                        if (ball.wallet >= 25000) {
                            await member.roles.add(richRole);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role remember no refund XD"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 25000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
                case 4:
                    if (!member.roles.cache.has(wealthyRole)) {
                        if (ball.wallet >= 50000) {
                            await member.roles.add(wealthyRole);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role remember no refund XD"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 50000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
                case 5:
                    if (!member.roles.cache.has(gamblerRole)) {
                        if (ball.wallet >= 100000) {
                            await member.roles.add(gamblerRole);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role psst... where did you get all the money from? 😐"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 100000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
                case 6:
                    if (!member.roles.cache.has(millionaire)) {
                        if (ball.wallet >= 1000000) {
                            await member.roles.add(millionaire);
                            await interaction.reply(
                                "Congartes 🎉 man you got That Role remember no refund XD man you FUCKING RIIICHHH (open a ticket so someone will contact you about staff role)"
                            );
                            await memberSchema.findOneAndUpdate(
                                {
                                    discordId: userId,
                                },
                                { wallet: oldWallet - 1000000 }
                            );
                        } else {
                            await interaction.reply(
                                "😑 are you sure you have that much? check if you have it in your wallet not the bank"
                            );
                        }
                    } else {
                        await interaction.reply(
                            "🤨 you already have the role man do you want it twice???"
                        );
                    }
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    },
};
