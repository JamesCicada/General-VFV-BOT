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
                .setMaxValue(100)
                .setMinValue(1)
        ),
    async execute(interaction) {
        let numberOfMessages = interaction.options.getInteger("number");
        let channel = interaction.channel;
        try {
            if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
                await channel.bulkDelete(numberOfMessages).then(() => {
                    interaction.reply(
                        "`Deleted " + numberOfMessages + " messages`"
                    );
                    setTimeout(() => interaction.deleteReply(), 3000);
                });
            } else {
                interaction.reply("you don't have permission to do that");
            }
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
