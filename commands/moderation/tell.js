const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tell")
        .setDescription("sends a dm to a user from the bot's account")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna dm")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("the message you wanna send")
                .setRequired(true)
        ),
    async execute(interaction) {
        let member = interaction.options.getUser("user");
        let message = interaction.options.getString("message");
        await interaction.reply({
            content: `the message was sent successfully to ${member.tag}`,
            ephemeral: true,
        });
        await interaction.guild.channels.cache.get("985773188753547334").send(
            //`'${}' told '${}' '${}' `
            "`" +
                interaction.user.tag +
                " told " +
                member.tag +
                " " +
                message +
                " in dms `"
        );
        member.fetch(member.id, false).then((user) => {
            user.send(`${message}`);
        });
    },
};
//DONE
