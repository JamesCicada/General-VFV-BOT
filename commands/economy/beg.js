const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("beg for some change"),
    async execute(interaction) {
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let pro = Math.round(Math.random() * 500) + 30;
        let old = ball.wallet;
        let date = new Date().now;
        let expired = moment(date).add({ minutes: 5 }).format();
        //let expiredNoFormat = moment(new Date().now).add({ minutes: 5 });
        console.log(expired);
        //'2013-03-24T10:15:20:12Z';
        let timeoutCheck = await memberSchema.findOne({ discordId: userId });
        let checkTimeout = await timeoutCheck.begTimeout;
        console.log(checkTimeout);
        console.log(expired);
        console.log(moment(checkTimeout).isAfter(expired));

        try {
            if (moment(date).isSameOrAfter(checkTimeout) || checkTimeout == 0) {
                await memberSchema.findOneAndUpdate(
                    { discordId: userId },
                    { wallet: old + pro, begTimeout: expired }
                );
                console.log(await memberSchema.findOne({ discordId: userId }));
                await interaction.reply(`you made ${pro}𝒱`);
            } else {
                interaction.reply(
                    `lol you need to wait 5 minutes before you beg again you greedy mf 🤨`
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
