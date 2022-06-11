const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("a list of all the commands"),
    async execute(interaction) {
                let embed = {
                    embeds: [
                        {
                            title: "How Gorgeous! <3",
                            color: 2427689,
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024",
                                text: "VFV | V FOR VENDETTA",
                            },
                            image: {
                                url: `${avatar}`,
                            },
                            author: {
                                name: `${mentioned || interaction.user.tag}`,
                                icon_url: `${avatar}`,
                            },
                        },
                    ],
                };
    },
};
