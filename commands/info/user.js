const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Shows Informations About you or the mentioned user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the user you wanna check")
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            let target =
                interaction.options.getUser("user") || interaction.user;
            let targetMember =
                interaction.options.getMember("user") || interaction.member;
            let creation = moment.utc(target.createdAt).format("YYYY/MM/DD");
            let joined;
            let joinAge;
            let accountAge = `<t:${parseInt(
                target.createdTimestamp / 1000
            )}:R>`;
            let avatar = target.displayAvatarURL({ size: 1024, dynamic: true });
            let guild = interaction.guild;
            let isInServer = guild.members.cache.get(target.id);
            //console.log(guild);
            if (!isInServer) {
                joinAge = `${target.username} is not in this  server`;
                joined = ``;
            } else {
                joinAge = `<t:${parseInt(
                    targetMember.joinedTimestamp / 1000
                )}:R>`;
                joined = moment.utc(targetMember.joinedAt).format("YYYY/MM/DD");
            }
            let embed = {
                embeds: [
                    {
                        type: "rich",
                        title: `𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐀𝐁𝐎𝐔𝐓 ${target.username}`,
                        description: "",
                        color: "RANDOM",
                        fields: [
                            {
                                name: `𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐖𝐀𝐒 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐀𝐓`,
                                value: `${creation} (${accountAge})`,
                            },
                            {
                                name: `𝐉𝐎𝐈𝐍𝐄𝐃 𝐒𝐄𝐑𝐕𝐄𝐑 𝐀𝐓`,
                                value: `${joined} (${joinAge})`,
                            },
                        ],
                        thumbnail: {
                            url: `${avatar}`,
                            height: 0,
                            width: 0,
                        },
                        footer: {
                            text: `𝐕𝐅𝐕 | 𝐕 𝐅𝐎𝐑 𝐕𝐄𝐍𝐃𝐄𝐓𝐓𝐀`,
                            icon_url: `https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024`,
                        },
                    },
                ],
            };
            await interaction.reply(embed);
        } catch (err) {
            console.log(err);
        }
    },
};
