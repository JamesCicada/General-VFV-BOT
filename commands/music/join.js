const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("joins the voice channel"),
    async execute(interaction) {
        const channel = interaction.user.channel;
        const connection = getVoiceConnection(myVoiceChannel.guild.id);

        const connect = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        await interaction.reply(`joined the channel`);
    },
};
//DONE
