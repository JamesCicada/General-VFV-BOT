const { SlashCommandBuilder } = require("@discordjs/builders");
//const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows Informations About The Bot"),

    async execute(interaction) {
        //let color = randomColor().slice(1);
        let embed = {
            embeds: [
                {
                    type: "rich",
                    title: `𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣 𝘼𝙗𝙤𝙪𝙩 𝙏𝙝𝙚 𝘽𝙤𝙩`,
                    description: "",
                    color: "RANDOM",
                    fields: [
                        {
                            name: `𝐓𝐡𝐢𝐬 𝐁𝐨𝐭 𝐖𝐚𝐬 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐁𝐲`,
                            value: `𝙅𝙖𝙢𝙚𝙨𝘾𝙞𝙘𝙖𝙙𝙖`,
                        },
                        {
                            name: `𝐓𝐡𝐢𝐬 𝐁𝐨𝐭 𝐖𝐚𝐬 𝐌𝐚𝐝𝐞 𝐄𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐞𝐥𝐲 𝐅𝐨𝐫 7HE SE7EN 𝐒𝐞𝐫𝐯𝐞𝐫`,
                            value: `-----------------------------------------------------------------------------------`,
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
        await interaction.reply(embed);
    },
};
