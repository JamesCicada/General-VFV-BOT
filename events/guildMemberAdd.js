const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        //https://discord.com/api/webhooks/992629853025206272/cBWC5JVaJjyjCEPOuXIx11tixJyG05FWCg132N6V-cAqh75mZIt-ZORJGg4MrHIK4UjE
        const { user, guild } = member;
        const Welcomer = new WebhookClient({
            id: "992629853025206272",
            token: "cBWC5JVaJjyjCEPOuXIx11tixJyG05FWCg132N6V-cAqh75mZIt-ZORJGg4MrHIK4UjE",
        });
        const Welcome = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`Hi ${member} Welcome to **${guild.name}**\n
            Account Created <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Now we are **${guild.memberCount}** members`);
        Welcomer.send({ embeds: [Welcome] });
    },
};
