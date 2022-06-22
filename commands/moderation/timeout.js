const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a user (please spicify the reason)")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna timeout")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("delay")
                .setDescription(
                    "how many seconds do you wanna timeout them (0 to remove it)"
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("why did you timeout them")
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            let Targetmember = interaction.options.getMember("user");
            let Target = interaction.options.getUser("user");
            let delay = interaction.options.getInteger("delay");
            let reason = interaction.options.getString("reason");
            if (delay == 0) {
                await Targetmember.timeout(
                    delay * 1000,
                    reason || "no specified reason"
                );
                await interaction.reply(`${Target}'s timeout was cleared`);
            } else {
                await Targetmember.timeout(
                    delay * 1000,
                    reason || "no specified reason"
                );
                await interaction.reply(
                    `${Target} was timed out for ${delay} for ${
                        reason || "no specified reason"
                    }`
                );
            }
            //console.log(member, newNick);
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: "i don't have permission to do that",
                ephemeral: true,
            });
        }
    },
};
//DONE
