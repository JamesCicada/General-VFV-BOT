const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("a list of roles you can buy"),
    async execute(interaction) {
        let embedShop = {
            embeds: [
                {
                    type: "rich",
                    title: `SHOP`,
                    description:
                        "run /buy + item id to buy (admins can remove a role if the member abused the given power and the staff role will be reviewed)",
                    color: "RANDOM",
                    fields: [
                        {
                            name: `ROLE: POOR (1K𝒱 ) ID: 1`,
                            value: `PERKS: NONE`,
                        },
                        {
                            name: `ROLE: MID (5K𝒱 ) ID: 2`,
                            value: `PERKS: NONE`,
                        },
                        {
                            name: `ROLE: RICH (25K𝒱 ) ID: 3`,
                            value: `PERKS: JOIN VIP ROOMS`,
                        },
                        {
                            name: `ROLE: WEALTHY (50K𝒱 ) ID: 4`,
                            value: `PERKS: CHANGE NICKNAME`,
                        },
                        {
                            name: `ROLE: GAMBLER (100K𝒱 ) ID: 5`,
                            value: `PERKS: MOVE OTHER MEMBERS`,
                        },
                        {
                            name: `ROLE: MILLIONAIRE (+STAFF) (1M𝒱 ) ID: 6`,
                            value: `PERKS: STAFF`,
                        },
                        {
                            name: `****************************`,
                            value: `****************************`,
                        },
                    ],
                    thumbnail: {
                        url: `https://cdn.discordapp.com/avatars/933341730827276318/f1547942f7832a61b0557a4299fd988f.webp?size=1024`,
                        height: 0,
                        width: 0,
                    },
                    footer: {
                        text: `𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡`,
                        icon_url: `https://cdn.discordapp.com/avatars/933341730827276318/f1547942f7832a61b0557a4299fd988f.webp?size=1024`,
                    },
                },
            ],
        };
        await interaction.reply(embedShop);
    },
};
