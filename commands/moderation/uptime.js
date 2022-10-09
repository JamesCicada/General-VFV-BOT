const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("when did the bot restart"),
    async execute(interaction, client) {
        let uptime = client.uptime;
        let messageUptime = `${moment(uptime).format("DD") - 1} days, ${moment(
            uptime
        ).format("HH")} hours, ${moment(uptime).format("mm")} minutes, ${moment(
            uptime
        ).format("ss")} seconds`;
        interaction
            .reply({
                content: `Calculating...`,
            })
            .then(() => {
                interaction.editReply({
                    content: "`I have been up for " + messageUptime + "`",
                });
            });
    },
};
