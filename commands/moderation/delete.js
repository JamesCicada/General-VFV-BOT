const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("delete multiple messages")
        .setDefaultMemberPermissions(4)
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("how many message do you wanna delete?")
                .setRequired(true)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        let numberOfMessages = interaction.options.getInteger("number");
        let channel = interaction.channel;
        if (numberOfMessages === 0) {
            interaction.reply(
                "you needa specify how many messages you wanna delete stupid!"
            );
            setTimeout(() => interaction.deleteReply(), 3000);
        } else {
            await channel.bulkDelete(numberOfMessages).then(() => {
                interaction.reply(
                    "`Deleted " + numberOfMessages + " messages`"
                );
                setTimeout(() => interaction.deleteReply(), 3000);
            });
        }
    },
};
//DONE

/*message.channel.bulkDelete(100).then(() => {
    message.channel
        .send("Deleted 100 messages.")
        .then((msg) => msg.delete(3000));
});*/
