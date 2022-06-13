const { SlashCommandBuilder } = require("@discordjs/builders");
const randomColor = require("randomcolor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Shows your or the mentioned user's avatar")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("whose avatar do you wanna check?")
        ),

    async execute(interaction) {
        let color = randomColor().slice(1);
        let member = interaction.options.getUser("user") || interaction.user;
        let mentioned = interaction.options.getUser("user");
        let avatar = member.displayAvatarURL({ size: 1024, dynamic: true });
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
                        url: `${avatar}`,
                    },
                    author: {
                        name: `${member.tag}`,
                        icon_url: `${avatar}`,
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
