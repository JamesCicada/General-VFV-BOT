const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("bans a specific user")
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
        try {
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
                            text: `𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡`,
                            icon_url: `https://cdn.discordapp.com/avatars/933341730827276318/f1547942f7832a61b0557a4299fd988f.webp?size=1024`,
                        },
                    },
                ],
            };
            if (!interaction.member.permissions.has("BAN_MEMBERS")) {
                interaction.reply("you don't have permission to do that");
            } else if (member == interaction.user) {
                interaction.reply(
                    `${interaction.user} you can't ban yourself silly :P`
                );
            } else {
                interaction.guild.bans.create(`${member.id}`, {
                    reason: reason1,
                });
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
                            `you were banned from &HE SE7EN Server by ${
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
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
