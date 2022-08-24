const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, CommandInteraction } = require("discord.js");
const { default: mongoose } = require("mongoose");
const vcSchema = require("../../Schemas/vcSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("voice")
        .setDescription("Control your own vc")
        .addSubcommand((option) =>
            option
                .setName("invite")
                .setDescription("invite someone to your channel")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("the user you wanna invite")
                        .setRequired(true)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("reject")
                .setDescription("ban someone from your vc")
                .addUserOption((option) =>
                    option
                        .setName("targetmember")
                        .setDescription("the user you wanna ban from your vc")
                        .setRequired(true)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("name")
                .setDescription("change the name of your channel")
                .addStringOption((option) =>
                    option
                        .setName("name")
                        .setDescription("the name you wanna set to your vc")
                        .setRequired(true)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("private")
                .setDescription("make your channel private")
                .addStringOption((option) =>
                    option
                        .setName("toggle")
                        .setDescription("on = private & off = public")
                        .addChoices(
                            { name: "on", value: "on" },
                            { name: "off", value: "off" }
                        )
                )
        )
        .addSubcommand((option) =>
            option
                .setName("limit")
                .setDescription("limit how many members can join your vc")
                .addIntegerOption((option) =>
                    option
                        .setName("number")
                        .setDescription("how many users do you wanna allow")
                        .setMaxValue(99)
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const Embed = new MessageEmbed().setColor("RANDOM");
        const ownedChannel = client.voiceGenerator.get(interaction.member.id);
        let dbData = await vcSchema.findOne({ channelID: voiceChannel });

        const { options, member, guild } = interaction;
        try {
            /*await vcSchema.findByIdAndUpdate(
                { ownerID: ownedChannel },
                { channelID: voiceChannel.id }
            );*/
            let channelOwner = dbData.ownerID;
            //console.log(channelOwner);
            if (!voiceChannel)
                return interaction.reply({
                    embeds: [
                        Embed.setDescription("you're not in a vc").setColor(
                            "RED"
                        ),
                    ],
                });
            if (!channelOwner || interaction.user.id != channelOwner) {
                //console.log(interaction.user);
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            "you're not the owner of this channel"
                        ).setColor("RED"),
                    ],
                });
            } else {
                switch (options.getSubcommand()) {
                    case "name":
                        {
                            const newName = options.getString("name");
                            voiceChannel.edit({ name: newName });
                            interaction.reply({
                                embeds: [
                                    Embed.setDescription(
                                        `channel was named to ${newName}`
                                    ),
                                ],
                            });
                        }
                        break;
                    case "invite":
                        {
                            const targetMember = options.getMember("user");
                            if (targetMember.id == interaction.user.id) {
                                interaction.reply(
                                    `${interaction.user}you can't invite yourself silly 😒`
                                );
                            } else {
                                if (
                                    targetMember.voice.channel &&
                                    targetMember.voice.channel.id ==
                                        voiceChannel.id
                                )
                                    targetMember.voice.setChannel(
                                        "992179944912339056"
                                    );
                                interaction.reply({
                                    embeds: [
                                        Embed.setDescription(
                                            `${targetMember} was invited to yor channel`
                                        ),
                                    ],
                                });
                                voiceChannel.permissionOverwrites.edit(
                                    targetMember,
                                    {
                                        CONNECT: true,
                                    }
                                );
                                interaction.reply({
                                    content: "invitation was sent",
                                    ephemeral: true,
                                });
                                interaction.guild.channels.cache
                                    .get("992223702710243499")
                                    .send({
                                        embeds: [
                                            Embed.setDescription(
                                                `${targetMember} you were invited to join <#${voiceChannel.id}> by ${member}`
                                            ),
                                        ],
                                    });
                            }
                        }
                        break;
                    case "reject":
                        {
                            const targetMember =
                                options.getMember("targetmember");
                            if (targetMember.id == interaction.user.id) {
                                interaction.reply(
                                    `${interaction.user}you can't ban yourself silly 😒`
                                );
                            } else {
                                voiceChannel.permissionOverwrites.edit(
                                    targetMember,
                                    {
                                        CONNECT: false,
                                    }
                                );
                                if (
                                    targetMember.voice.channel &&
                                    targetMember.voice.channel.id ==
                                        voiceChannel.id
                                )
                                    targetMember.voice.setChannel(
                                        "992179944912339056"
                                    );
                                interaction.reply({
                                    embeds: [
                                        Embed.setDescription(
                                            `${targetMember} was banned from yor channel`
                                        ),
                                    ],
                                });
                            }
                        }
                        break;
                    case "private":
                        {
                            const turnChoice = options.getString("toggle");
                            switch (turnChoice) {
                                case "off":
                                    {
                                        voiceChannel.permissionOverwrites.edit(
                                            guild.id,
                                            { CONNECT: null },
                                            interaction.reply({
                                                embeds: [
                                                    Embed.setDescription(
                                                        "voice channel is now private"
                                                    ),
                                                ],
                                            })
                                        );
                                    }
                                    break;
                                case "on":
                                    {
                                        voiceChannel.permissionOverwrites.edit(
                                            guild.id,
                                            {
                                                CONNECT: false,
                                            },
                                            interaction.reply({
                                                embeds: [
                                                    Embed.setDescription(
                                                        "voice channel is now public"
                                                    ),
                                                ],
                                            })
                                        );
                                    }
                                    break;
                            }
                        }
                        break;
                    case "limit":
                        {
                            const limit = options.getInteger("number");
                            voiceChannel.edit({
                                userLimit: limit,
                            });
                            if (limit === 0) {
                                await interaction.reply({
                                    embeds: [
                                        Embed.setDescription(
                                            `channel is now unlimeted`
                                        ),
                                    ],
                                });
                            } else {
                                await interaction.reply({
                                    embeds: [
                                        Embed.setDescription(
                                            `channel is now limited to ${limit} users`
                                        ),
                                    ],
                                });
                            }
                        }
                        break;
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
