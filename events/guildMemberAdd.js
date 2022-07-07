const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
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
        try {
            let userId = user.id;
            let ball = await memberSchema.findOne({ discordId: userId });
            let username = user.username;
            console.log(username);
            if (!ball) {
                //console.log(username.username);
                await new memberSchema({
                    username: username,
                    discordId: userId,
                    ballance: 1000,
                    wallet: 100,
                    begTimeout: 0,
                })
                    .save()
                    .then(console.log("added new member to db successffully"));
            }
        } catch (err) {
            console.log(err);
        }
    },
};
