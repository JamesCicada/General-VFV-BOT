const { MessageEmbed, ContextMenuInteraction } = require("discord.js");
const { ContextMenuCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("userinfo")
        .setType(2)
        .setDefaultMemberPermissions(8),
    /**
     *
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(
            interaction.targetId
        );
        //console.log(target.id);
        let Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(
                target.user.tag,
                target.user.displayAvatarURL({ dynamic: true, size: 512 })
            )
            .setThumbnail(
                target.user.displayAvatarURL({ dynamic: true, size: 512 })
            )
            .addField("ID", `${target.user.id}`)
            .addField(
                "ROLES",
                `${
                    target.roles.cache
                        .map((r) => r)
                        .join(" ")
                        .replace("@everyone", "") || "None"
                }`
            )
            .addField(
                "Member Since",
                `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
                true
            )
            .addField(
                "Account Created At",
                `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
                true
            );
        try {
            interaction.reply({ embeds: [Embed] });
        } catch (err) {
            console.log(err);
        }
    },
};
