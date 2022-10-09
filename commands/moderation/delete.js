const { SlashCommandBuilder } = require("@discordjs/builders");
const { permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("delete multiple messages")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many message do you wanna delete?")
                .setRequired(true)
                .setMaxValue(200)
                .setMinValue(1)
        ),
    async execute(interaction, client) {
        try {
            let channel = interaction.channel;
            let number = interaction.options.getInteger("number");
            let messages = await channel.messages.fetch({ limit: number });
            // ignore messages that are older than 14 days
            messages = messages.filter(
                (m) => m.createdTimestamp > Date.now() - 12096e5
            );
            // ignore pinned messages
            messages = messages.filter((m) => !m.pinned);
            // ignore messages that are system messages
            messages = messages.filter((m) => !m.system);
            // now delete the messages
            if (messages.size === 0) {
                interaction.reply({
                    content: "`There are no messages to delete`",
                    ephemeral: true,
                });
            } else {
                await channel.bulkDelete(messages).then((msg) => {
                    interaction.reply({
                        content: "`Deleted " + msg.size + " messages.`",
                    });
                    setTimeout(() => {
                        interaction.deleteReply();
                    }, 5000);
                });
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
