const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("bans a specific user")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna ban")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("why do you want to ban this user?")
                .setRequired(false)
        ),
    async execute(interaction) {
        let member = interaction.options.getUser("user");
        let reason1 = interaction.options.getString("reason");
        let embed = {
            embeds: [
                {
                    type: "rich",
                    title: `'${member.tag}' has been banned with the id '${member.id}'`,
                    description: `reason : ${
                        reason1 || "for no specified reason"
                    }`,
                    color: 0xf30606,
                    image: {
                        url: `https://c.tenor.com/PYLVrRgCT84AAAAd/hammer-game.gif`,
                        height: 0,
                        width: 0,
                    },
                    author: {
                        name: `${interaction.user.tag} `,
                    },
                    footer: {
                        text: `VFV | V FOR VENDETTA`,
                        icon_url: `https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024`,
                    },
                },
            ],
        };
        if (member == interaction.user) {
            interaction.reply(
                `${interaction.user} you can't ban yourself silly :P`
            );
        } else {
            interaction.guild.bans.create(`${member.id}`, { reason: reason1 });
            await interaction.reply({
                content: `you banned ${member} for ${
                    reason1 || "for no specified reason"
                }`,
                ephemeral: true,
            });
            await interaction.guild.channels.cache
                .get("985249240966119424")
                .send(embed);
            if (!member.bot) {
                member.fetch(member.id, false).then((user) => {
                    user.send(
                        `you were banned from VFV Server by ${
                            interaction.user.tag
                        } for ${
                            reason1 || "for no specified reason,"
                        } if you think this is a mistake please reply to this message`
                    );
                });
            } else {
                interaction.channel.send("can't send messages to bots");
            }
        }
    },
};
//DONE
