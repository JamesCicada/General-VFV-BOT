const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the Bot's ping"),
    async execute(interaction) {
        interaction.reply(
            `🏓 Latency is ${
                Date.now() - interaction.createdTimestamp.math
            } ms.`
        );
    },
};
