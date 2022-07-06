const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("claim your daily 𝒱 creds"),
    async execute(interaction) {
        let username = interaction.user.username;
        let userId = interaction.user.id;
        let ball = await memberSchema.findOne({ discordId: userId });
        let pro = Math.round(Math.random() * 3000) + 1000;
        let old = ball.wallet;
        let date = new Date().now;
        let nowDate = moment(new Date().now).format();
        let expired = moment(date).add({ hours: 24 }).format();
        //let expiredNoFormat = moment(new Date().now).add({ minutes: 5 });
        //console.log(expired);
        //'2013-03-24T10:15:20:12Z';
        let timeoutCheck = await memberSchema.findOne({ discordId: userId });
        let checkTimeout = await timeoutCheck.dailyCooldown;
        //console.log(checkTimeout);
        //console.log(expired);
        //console.log(moment(checkTimeout).isAfter(expired));
        //let timeLeft = await moment(checkTimeout).diff(nowDate, "hours", true);
        let timeLeftMin = await moment(checkTimeout).diff(
            nowDate,
            "hours",
            true
        );
        //console.log(timeLeftMin);
        let minutes = timeLeftMin.toString().split(".").pop();
        let minutesLast = `0.${minutes}` * 60;
        let hours = Math.floor(timeLeftMin);
        let leftMinutes = Math.round(minutesLast);
        //console.log(leftMinutes);

        try {
            if (moment(date).isSameOrAfter(checkTimeout) || !checkTimeout) {
                await memberSchema.findOneAndUpdate(
                    { discordId: userId },
                    { ballance: old + pro, dailyCooldown: expired }
                );
                //console.log(await memberSchema.findOne({ discordId: userId }));
                await interaction.reply(
                    `you made ${pro}𝒱 today come back tomorrow to get your next daily`
                );
            } else {
                interaction.reply(
                    "`you still need to wait " +
                        hours +
                        " hours " +
                        leftMinutes +
                        " minutes`"
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
