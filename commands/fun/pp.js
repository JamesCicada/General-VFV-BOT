const { SlashCommandBuilder } = require("@discordjs/builders");
const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pp")
        .setDescription("checks how long is your pp")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("who's pp you wanna check?")
                .setRequired(false)
        ),

    async execute(interaction) {
        let color = randomColor().slice(1);
        let member = interaction.options.getUser("user") || interaction.user;
        let random = Math.round(Math.random() * 20) + 1;
        let embedsmall = {
            embeds: [
                {
                    type: "rich",
                    title: `pp size check`,
                    description: "",
                    color: color,
                    fields: [
                        {
                            name: `${member.username}'s pp is so small`,
                            value: `pp size ${random} cm`,
                        },
                    ],
                    image: {
                        url: `https://media2.giphy.com/media/l41lMMzTCBvXqtEUU/giphy.gif?cid=ecf05e47m5ebgjhcpbhbfnjd7yaw6h6dc387kszmf8zm8psd&rid=giphy.gif&ct=g`,
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
        let embedhuge = {
            embeds: [
                {
                    type: "rich",
                    title: `pp size check`,
                    description: "",
                    color: color,
                    fields: [
                        {
                            name: `${member.username}'s pp is HUGE`,
                            value: `pp size ${random} cm`,
                        },
                    ],
                    image: {
                        url: `https://media4.giphy.com/media/1YGXw8iYAqwZLi3Amn/giphy.gif?cid=ecf05e47wc052h0molh0ywzksagop2xedp70zfx8cr39vmus&rid=giphy.gif&ct=g`,
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
        if (random <= 10) {
            await interaction.reply(embedsmall);
        } else {
            await interaction.reply(embedhuge);
        }
    },
};
