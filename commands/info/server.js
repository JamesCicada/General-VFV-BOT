const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client } = require("discord.js");

const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Shows Informations About the Server"),

    async execute(interaction) {
        try {
            let server = interaction.guild;
            let owner = await server.fetchOwner();
            let embed = {
                embeds: [
                    {
                        type: "rich",
                        title: `ABOUT ${server.name}`,
                        description: "",
                        color: "RANDOM",
                        fields: [
                            {
                                name: `THIS SERVER WAS CREATED BY`,
                                value: `JamesCicada`,
                            },
                            {
                                name: `THIS SERVER WAS CREATED AT `,
                                value: `${moment
                                    .utc(server.createdAt)
                                    .format("YYYY/MM/DD")} (${moment(
                                    server.createdAt
                                ).fromNow()})`,
                            },
                            {
                                name: `you can check the rules in`,
                                value: `${server.rulesChannel}`,
                            },
                            {
                                name: `afk channel is `,
                                value: `${server.afkChannel}`,
                            },
                            {
                                name: `members count`,
                                value: `${server.memberCount}`,
                            },
                            {
                                name: `this server's mfa level is`,
                                value: `${server.mfaLevel}`,
                            },
                        ],
                        image: {
                            url: `${server.iconURL({
                                size: 1024,
                                dynamic: true,
                            })}`,
                        },
                        footer: {
                            text: `𝐕𝐅𝐕 | 𝐕 𝐅𝐎𝐑 𝐕𝐄𝐍𝐃𝐄𝐓𝐓𝐀`,
                        },
                    },
                ],
            };
            interaction.reply(embed);
        } catch (err) {
            console.log(err);
        }
    },
};
