const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("when did the bot restart"),
    async execute(interaction) {
        let uptime = memberSchema.findOne({
            discordId: 551893446726778901,
        });
        let botUptime = moment(uptime.botUptime).from();
        let exactUptime = moment(uptime.botUptime).format(
            "YYYY/MM/DD hh:mm:ss"
        );
        interaction.reply(
            "` the bot has been up for " +
                botUptime +
                " exactly since " +
                exactUptime +
                "`"
        );
    },
};
