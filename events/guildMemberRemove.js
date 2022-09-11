const Discord = require("discord.js");
const { MessageEmbed, CommandInteraction } = require("discord.js");
const { execute } = require("./guildMemberAdd");
module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        const Embed = new MessageEmbed().setColor("RANDOM");
        try {
            if (!member.bot) {
                member.fetch(member.id, false).then((user) => {
                    user.send({
                        embeds: [
                            Embed.setTitle("Farewell Friend")
                                .setDescription(
                                    `Hey Friend we understand that you might want to take a rest from our server but you can always send **server** or **invite** to the bot to get a server's invite we'll miss you 💔 have a good Day!`
                                )
                                .setColor("RANDOM")
                                .setImage(
                                    "https://media.discordapp.net/attachments/933516796076650587/1018609563529924750/anime-waving-gif-13.gif"
                                )
                                .setAuthor({
                                    name: "𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡",
                                    iconURL:
                                        "https://images-ext-2.discordapp.net/external/thep7nG_zKrHogZl003r4JpbMmvOYewVWex2FwvtMqM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/933341730827276318/f1547942f7832a61b0557a4299fd988f.webp?width=701&height=701",
                                })
                                .setFooter({
                                    text: "7HE SE7EN",
                                    iconURL:
                                        "https://images-ext-2.discordapp.net/external/xo2a6MX_tFzwSSHSAl9cJKmYGbnf_xrUSjrPLgGg6Xg/%3Fsize%3D1024/https/cdn.discordapp.com/icons/825526271311478824/46f05e8e27c78df963b3d79bf67d64ea.png",
                                }),
                        ],
                    });
                });
            } else return;
        } catch (err) {
            console.log(err);
        }
    },
};
