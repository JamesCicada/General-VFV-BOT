const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("unbans a specific user")
        .setDefaultMemberPermissions(2)
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna unban (ID)")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("why do you want to ban this user?")
                .setRequired(false)
        ),
    async execute(interaction) {
        let memberCheck = interaction.options.getUser("user");
        let reason = interaction.options.getString("reason");
        let embed = {
            embeds: [
                {
                    type: "rich",
                    title: `'${memberCheck.tag}' has been unbanned with the id '${memberCheck.id}'`,
                    description: `reason : ${reason}`,
                    color: 0xf30606,
                    image: {
                        url: `https://media0.giphy.com/media/3oriO5sZ43mUXSHrkk/giphy.gif?cid=ecf05e47yglq6tgkj9iu601gztiu4m2p7b7r930q0ivw4whz&rid=giphy.gif&ct=g`,
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
        try {
            const banned = await interaction.guild.bans.fetch(memberCheck);
            //console.log(banned);
            /*const bannedUser = banList.find(
                (user) => user.id === `${memberCheck}`
            );*/
            //console.log(bannedUser);
            if (banned === undefined)
                await interaction.reply(`${memberCheck.tag} is not banned.`);
            else {
                interaction.guild.bans.remove(`${memberCheck.id}`);
                await interaction.reply({
                    content: `you unbanned ${memberCheck} for ${
                        reason || "no specified reason"
                    }`,
                    ephemeral: true,
                });
                await interaction.guild.channels.cache
                    .get("985786433644146739")
                    .send(embed);
                memberCheck.fetch(memberCheck.id, false).then((user) => {
                    user.send(
                        `you were unbanned by ${interaction.user.tag} for ${reason} sorry for this`
                    );
                });
            }
        } catch (err) {
            console.error(err);
        }
        /*if (!banCheck == member.id) {
            await interaction.reply(`${member.tag} is not banned`);
        } else {
            interaction.guild.bans.remove(`${member.id}`);
            await interaction.reply({
                content: `you unbanned ${member} for ${
                    reason || "no specified reason"
                }`,
                ephemeral: true,
            });
            await interaction.guild.channels.cache
                .get("985786433644146739")
                .send(embed);
            member.fetch(member.id, false).then((user) => {
                user.send(
                    `you were unbanned by ${interaction.user.tag} for ${reason} sorry for this`
                );
            });
        }*/
    },
};
//DONE
