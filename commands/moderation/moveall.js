const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moveall")
        .setDescription("move everyone from a channel to another channel")
        .setDefaultMemberPermissions(2)
        .addChannelOption((option) =>
            option
                .setName("fromchannel")
                .setDescription("the channel you wanna move everyone from")
                .setRequired(true)
                .addChannelTypes(2)
        )
        .addChannelOption((option) =>
            option
                .setName("tochannel")
                .setDescription("the channel you wanna move everyone to")
                .setRequired(false)
                .addChannelTypes(2)
        ),
    async execute(interaction) {
        try {
            let fromChannel = interaction.options.getChannel("fromchannel");
            let toChannel = interaction.options.getChannel("tochannel");
            //let user = interaction.user;
            //let userMember = interaction.member;
            let defaultChannel = interaction.member.voice.channel;
            let moveToChannel = toChannel || defaultChannel;
            for (const [, member] of fromChannel.members) {
                await member.voice.setChannel(moveToChannel);
            }
            await interaction.reply(
                `i moved all members from ${fromChannel} to ${moveToChannel}`
            );
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: "i don't have permission to do that",
                ephemeral: true,
            });
        }
    },
};
//DONE
