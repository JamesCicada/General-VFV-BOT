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
                .setMinValue(1)
        ),
    async execute(interaction) {
        let numberOfMessages = interaction.options.getInteger("number");
        let channel = interaction.channel;
        try {
            await channel.bulkDelete(numberOfMessages).then(() => {
                interaction.reply(
                    "`Deleted " + numberOfMessages + " messages`"
                );
                setTimeout(() => interaction.deleteReply(), 3000);
            });
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE

/*message.channel.bulkDelete(100).then(() => {
    message.channel
        .send("Deleted 100 messages.")
        .then((msg) => msg.delete(3000));
});*/
