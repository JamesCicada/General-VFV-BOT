const { SlashCommandBuilder } = require("@discordjs/builders");
const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gay")
        .setDescription("are you or the mentioned user gay?")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("the member you wanna test")
                .setRequired(false)
        ),

    async execute(interaction) {
        let color = randomColor().slice(1);
        let member = interaction.options.getUser("user") || interaction.user;
        let random = Math.round(Math.random() * 99) + 1;
        let embedGay = {
            embeds: [
                {
                    type: "rich",
                    title: `GAY TEST`,
                    description: "",
                    color: color,
                    fields: [
                        {
                            name: `${member.tag} is So Gay`,
                            value: `Gay Percentage ${random}%`,
                        },
                    ],
                    image: {
                        url: `https://media4.giphy.com/media/Ck1Pib39Dl5TSzFB3S/giphy.gif?cid=ecf05e472bic1jxo9ekltyqkhu15zu93vq8h2cznryulh1hl&rid=giphy.gif&ct=g`,
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
        let embedStraight = {
            embeds: [
                {
                    type: "rich",
                    title: `GAY TEST`,
                    description: "",
                    color: color,
                    fields: [
                        {
                            name: `${member.tag} is not Gay`,
                            value: `Gay Percentage ${random}%`,
                        },
                    ],
                    image: {
                        url: `https://media1.giphy.com/media/Tv2btKgK06tPy/giphy.gif?cid=ecf05e47cf3f9rl0j8ub0d3sg4zzgzmbxcx14z7ba4pfxn3j&rid=giphy.gif&ct=g`,
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
        if (random >= 50) {
            await interaction.reply(embedGay);
        } else {
            await interaction.reply(embedStraight);
        }
    },
};
