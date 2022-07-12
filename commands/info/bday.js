const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
//let seconds = new Date().getSeconds();
//let minutes = new Date().getMinutes();
//console.log(minutes, ":", seconds);
//let timer = seconds + 25;
//console.log(timer);
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bday")
        .setDescription("birthday 🎉🎁")
        .addSubcommand((option) =>
            option
                .setName("check")
                .setDescription("check your or someones bday")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("who's bday do you wanna know?")
                        .setRequired(false)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("set")
                .setDescription("add your bday to the bot's database")
                .addStringOption((option) =>
                    option
                        .setName("date")
                        .setDescription(
                            "your birthdate(should be like : 2002-02-27)"
                        )
                )
        ),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "check":
                let targettedUser =
                    interaction.options.getUser("user") || interaction.user;
                let ball = await memberSchema.findOne({
                    discordId: targettedUser,
                });
                try {
                    if (!ball || !ball.bday) {
                        interaction.reply(
                            `i have no info about ${targettedUser}'s bday run the "/bday set"command to add your birthday`
                        );
                    } else {
                        let birthYear = ball.bday.toString().slice(11, 15);
                        let birth = ball.bday.toString().slice(4, 15);
                        //console.log(birthYear);
                        let date = new Date();
                        //console.log(date.getFullYear());
                        let age = date.getFullYear() - parseInt(birthYear);
                        //console.log(age);
                        interaction.reply(
                            `${targettedUser} was born in ${birth} (${age} years old)`
                        );
                    }
                } catch (err) {
                    console.log(err);
                }

                return;
            case "set":
                let targetUser =
                    interaction.options.getUser("user") || interaction.user;
                let bday = interaction.options.getString("date");
                await memberSchema.findOneAndUpdate(
                    { discordId: targetUser },
                    { bday: bday }
                );
                return interaction.reply("your bday was set to " + bday);
        }
    },
};
