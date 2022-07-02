const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("emitt")
        .setDescription("Event emitter")
        .setDefaultMemberPermissions(4)
        .addStringOption((option) =>
            option
                .setName("member")
                .setDescription("the member you wanna test on")
                .setRequired(true)
                .addChoices(
                    { name: "guildMemberAdd", value: "guildMemberAdd" },
                    { name: "guildMemberRemove", value: "guildMemberRemove" }
                )
        ),
    execute(interaction, client) {
        const choices = interaction.options.getString("member");
        switch (choices) {
            case "guildMemberAdd":
                {
                    client.emit("guildMemberAdd", interaction.member);
                    interaction.reply("emitted the event successfully");
                }
                break;
            case "guildMemberRemove":
                {
                    client.emit("guildMemberRemove", interaction.member);
                    interaction.reply("emitted the event successfully");
                }
                break;
        }
    },
};
