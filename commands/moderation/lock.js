const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("lock the current channel")
        .setDefaultMemberPermissions(4),
    async execute(interaction) {
        try {
            let channel = interaction.channel;
            channel.permissionOverwrites.edit("983382080597684254", {
                //VIEW_CHANNEL: true,
                SEND_MESSAGES: false,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: false,
            });
            await interaction.reply(
                `this channel is now locked (requested by ${interaction.user})`
            );
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
