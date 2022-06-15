const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { distube } = require("distube");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("it is obvious")
        .addSubcommand((option) =>
            option
                .setName("play")
                .setDescription("plays a specific song")
                .addStringOption((option) =>
                    option
                        .setName("query")
                        .setDescription("name or url of the song")
                        .setRequired(true)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("volume")
                .setDescription("change the volume")
                .addIntegerOption((option) =>
                    option
                        .setName("percentage")
                        .setDescription("10 = 10%")
                        .setRequired(true)
                )
        )
        .addSubcommand((option) =>
            option
                .setName("settings")
                .setDescription("some options to use")
                .addStringOption((option) =>
                    option
                        .setName("options")
                        .setDescription("select an option")
                        .setRequired(true)
                        .addChoices(
                            { name: "queue", value: "queue" },
                            { name: "skip", value: "skip" },
                            { name: "pause", value: "pause" },
                            { name: "resume", value: "resume" },
                            { name: "stop", value: "stop" },
                            { name: "loop", value: "loop" }
                        )
                )
        ),
    /*
        {
            name: "settings",
            description: "select an option",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option",
                    type: "string",
                    required: true,
                    choices: [{ name: "queue", value: "queue" }],
                    choices: [{ name: "skip", value: "skip" }],
                    choices: [{ name: "pause", value: "pause" }],
                    choices: [{ name: "resume", value: "resume" }],
                    choices: [{ name: "stop", value: "stop" }],
                },
            ],
        },
    ],*/

    /*/**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        if (!VoiceChannel)
            return interaction.reply({
                content: "Join a voice channel before running this command",
                ephemeral: true,
            });

        if (
            guild.me.voice.channelId &&
            VoiceChannel.id !== guild.me.voice.channelId
        )
            return interaction.reply({
                content: `i'm busy playing music in  <#${guild.me.voice.channelId}> try MOMMY bot (!p)`,
                ephemeral: true,
            });
        try {
            switch (options.getSubcommand()) {
                case "play": {
                    client.distube.play(
                        VoiceChannel,
                        options.getString("query"),
                        { textChannel: channel, member: member }
                    );
                    return interaction.reply({
                        content: "🎵  request recieved.",
                    });
                }
                case "volume": {
                    const Volume = options.getNumber("percentage");
                    if (Volume > 100 || Volume < 1)
                        return interaction.reply({
                            content:
                                "chose a number between 1 and 100 (i.e 50 = 50%)",
                        });
                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({
                        content: `🔊 Volume is now \`${Volume}%\``,
                    });
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);
                    if (!queue)
                        return interaction.reply({
                            content: `🚫 There's no queue currently.`,
                        });
                    switch (options.getString("options")) {
                        case "skip":
                            await queue.skip(VoiceChannel);
                            return interaction.reply({
                                content: `⏭ skipped to the next song in queue.`,
                            });
                        case "stop":
                            await queue.stop(VoiceChannel);
                            return interaction.reply({
                                content: `⏹ stopped the music i will leave soon (remember remember the 5th of november)`,
                            });
                        case "pause":
                            await queue.pause(VoiceChannel);
                            return interaction.reply({
                                content: `⏸ paused the music resume it whenever you want <3`,
                            });
                        case "resumw":
                            await queue.resumw(VoiceChannel);
                            return interaction.reply({
                                content: `⏯ resumed the music hope it's good <3`,
                            });
                        case "loop":
                            let mode = await queue.toggleAutoplay(VoiceChannel);
                            return interaction.reply({
                                content: `🔁 loop mode is now ${
                                    mode ? "On" : "Off"
                                }`,
                            });
                        case "queue":
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("RANDOM")
                                        .setDescription(
                                            `${queue.songs.map(
                                                (song, id) =>
                                                    `\n**${id + 1}**. ${
                                                        song.name
                                                    } -\`${
                                                        song.formattedDuration
                                                    }\``
                                            )}`
                                        ),
                                ],
                            });
                    }
                    return;
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`⛔ Alert: ${e}`);
            return interaction.reply({ embeds: [errorEmbed] }), console.log(e);
        }
    },
};
