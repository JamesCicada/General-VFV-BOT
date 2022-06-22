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
    /**
     *
     * @param {*} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            let Targetmember = interaction.options.getMember("user");
            let newNick = interaction.options.getString("newnick");

            //console.log(member, newNick);
            await Targetmember.setNickname(newNick);
            await interaction.reply(
                `${Targetmember.username}'s nickname was changed to ${newNick}`
            );
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
