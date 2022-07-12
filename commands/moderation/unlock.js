const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("unlock the current channel")
        .setDefaultMemberPermissions(4),
    async execute(interaction) {
        let channel = interaction.channel;
        channel.permissionOverwrites.edit("983382080597684254", {
            //VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: true,
        });
        await interaction.reply(
            `this channel is now unlocked (requested by ${interaction.user})`
        );
    },
};
//DONE
