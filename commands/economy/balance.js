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
        .setName("balance")
        .setDescription("shows you balance or someones balance")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("whos balance do you wanna check?")
                .setRequired(false)
        ),
    async execute(interaction) {
        //let cdTimer = timer + 25;
        let targettedUser =
            interaction.options.getUser("user") || interaction.user;
        let username = targettedUser.username;
        let userId = targettedUser.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        try if(!ball){
            'you had no balance i created a bank account for ya 😊'
        }else {
            await interaction.reply(
                `your balance is \n Bank : ${ball.ballance}𝒱  \n wallet: ${ball.wallet}𝒱`
            );
        }
            
        } catch (err) {
            console.log(err);
        }
    },
};
