const Discord = require("discord.js");
const { GuildMember, MessageAttachment, Client, Message } = Discord;
const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");
module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        //https://discord.com/api/webhooks/992629853025206272/cBWC5JVaJjyjCEPOuXIx11tixJyG05FWCg132N6V-cAqh75mZIt-ZORJGg4MrHIK4UjE
        const { user, guild } = member;
        const background =
            "https://cdn.discordapp.com/attachments/825527848441479189/1012922241886990416/343545.jpg";
        const dim = {
            height: 675,
            width: 1200,
            margin: 50,
        };

        const av = {
            size: 256,
            x: 480,
            y: 170,
        };

        const generateImage = async (member) => {
            let username = member.user.username;
            //let discrim = member.user.tag;
            let avatarURL = member.user.displayAvatarURL({
                format: "png",
                dynamic: false,
                size: av.size,
            });

            const canvas = Canvas.createCanvas(dim.width, dim.height);
            const ctx = canvas.getContext("2d");

            // draw in the background
            const backimg = await Canvas.loadImage(background);
            ctx.drawImage(backimg, 0, 0);

            // draw black tinted box
            ctx.fillStyle = "rgba(2,2,2,0.3)";
            ctx.fillRect(
                dim.margin,
                dim.margin,
                dim.width - 2 * dim.margin,
                dim.height - 2 * dim.margin
            );

            const avimg = await Canvas.loadImage(avatarURL);
            ctx.save();

            ctx.beginPath();
            ctx.arc(
                av.x + av.size / 2,
                av.y + av.size / 2,
                av.size / 2,
                0,
                Math.PI * 2,
                true
            );
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(avimg, av.x, av.y);
            ctx.restore();

            // write in text
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            // draw in Welcome
            ctx.font = "50px sans-serif";
            ctx.fillText("Welcome", dim.width / 2, dim.margin + 70);

            // draw in the username
            ctx.font = "60px sans-serif";
            ctx.fillText(
                username,
                dim.width / 2,
                dim.height - dim.margin - 125
            );

            // draw in to the server
            ctx.font = "40px sans-serif";
            ctx.fillText(`to VFV`, dim.width / 2, dim.height - dim.margin - 50);

            const attachment = new Discord.MessageAttachment(
                canvas.toBuffer(),
                "welcome.png"
            );
            return attachment;
        };
        try {
            const img = await generateImage(member);
            await member.guild.channels.cache.get("1012915868096798740").send({
                content: `<@${member.id}> Welcome to the server!`,
                files: [img],
            });
        } catch (err) {
            console.log(err);
        }
        /*const Welcomer = new WebhookClient({
            id: "992629853025206272",
            token: "cBWC5JVaJjyjCEPOuXIx11tixJyG05FWCg132N6V-cAqh75mZIt-ZORJGg4MrHIK4UjE",
        });
        const Welcome = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`Hi ${member} Welcome to **${guild.name}**\n
            Account Created <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Now we are now **${guild.memberCount}** members we love y'all 💞`);
        Welcomer.send({ embeds: [Welcome] });*/
        try {
            let userId = user.id;
            let ball = await memberSchema.findOne({ discordId: userId });
            let username = user.username;
            //console.log(username);
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
