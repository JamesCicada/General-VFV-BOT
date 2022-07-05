const { SlashCommandBuilder } = require("@discordjs/builders");
const { GuildBanManager } = require("discord.js");
const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banner")
        .setDescription("Shows your or the mentioned user's banner")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("whose avatar do you wanna check?")
        ),

    async execute(interaction, client) {
        let color = randomColor().slice(1);
        let member = interaction.options.getUser("user") || interaction.user;
        let user = await client.users.fetch(member, {
            force: true,
        });
        let banner = user.bannerURL({ size: 1024, dynamic: true });
        let embed = {
            embeds: [
                {
                    title: "How Gorgeous! <3",
                    color: color,
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.webp?size=1024",
                        text: "VFV | V FOR VENDETTA",
                    },
                    image: {
                        url: `${banner}`,
                    },
                    author: {
                        name: `${member.tag}`,
                        icon_url: `${banner}`,
                    },
                },
            ],
        };
        await interaction.reply(embed);
        /*member.fetch(member.id, false).then((user) => {
            user.send(`${member} checked your Avatar`);
        });*/
    },
};
//DONE*/
