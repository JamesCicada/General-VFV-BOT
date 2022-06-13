const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nick")
        .setDescription("changes someone's nickname")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna change their nickname")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("newnick")
                .setDescription("the new nickname")
                .setRequired(true)
        ),
    async execute(interaction) {
        let member = interaction.options.getUser("user");
        let newNick = interaction.options.getString("newnick");
        let target = member;
        target.setNickname(`${newNick}`);
        await interaction.reply(`${user}'s nickname was changed to ${newNick}`);
    },
};
//DONE
