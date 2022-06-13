const { SlashCommandBuilder } = require("@discordjs/builders");
const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows Informations About The Bot"),

    async execute(interaction) {
        let color = randomColor().slice(1);
        let embed = {
            embeds: [
                {
                    type: "rich",
                    title: `𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣 𝘼𝙗𝙤𝙪𝙩 𝙏𝙝𝙚 𝘽𝙤𝙩`,
                    description: "",
                    color: color,
                    fields: [
                        {
                            name: `𝐓𝐡𝐢𝐬 𝐁𝐨𝐭 𝐖𝐚𝐬 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐁𝐲`,
                            value: `𝙅𝙖𝙢𝙚𝙨𝘾𝙞𝙘𝙖𝙙𝙖`,
                        },
                        {
                            name: `𝐓𝐡𝐢𝐬 𝐁𝐨𝐭 𝐖𝐚𝐬 𝐌𝐚𝐝𝐞 𝐄𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐞𝐥𝐲 𝐅𝐨𝐫 𝐕𝐅𝐕 𝐒𝐞𝐫𝐯𝐞𝐫`,
                            value: `-----------------------------------------------------------------------------------`,
                        },
                    ],
                    thumbnail: {
                        url: `https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024`,
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
    },
};
