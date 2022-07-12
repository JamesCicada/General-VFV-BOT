const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bring")
        .setDescription("Bring someone to your voice channel")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the channel you wanna bring")
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            let targetMember = interaction.options.getMember("user");
            let target = interaction.options.getUser("user");
            let user = interaction.user;
            let userMember = interaction.member;
            let targetChannel = interaction.member.voice.channel;
            if (target == user) {
                interaction.reply(
                    `https://i.kym-cdn.com/entries/icons/mobile/000/023/397/C-658VsXoAo3ovC.jpg`
                );
            } else {
                if (!targetMember.voice.channel) {
                    await interaction.reply(
                        `${targetMember} is not in a voice channel`
                    );
                    return;
                } else if (!userMember.voice.channel) {
                    await interaction.reply(
                        "you need to join a voice channel first"
                    );
                } else {
                    await targetMember.voice.setChannel(targetChannel);
                    await interaction.reply(
                        `i moved ${targetMember} to ${targetChannel}`
                    );
                }
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
