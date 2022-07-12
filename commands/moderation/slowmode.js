const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slowmode")
        .setDescription("change this channel to slowmode or clears slowmode")
        .addIntegerOption((option) =>
            option
                .setName("duration")
                .setDescription("how many seconds (0 = off)")
                .setRequired(true)
                .setMaxValue(600)
        )
        .setDefaultMemberPermissions(4),
    async execute(interaction) {
        let channel = interaction.channel;
        let duration = interaction.options.getInteger("duration");
        try {
            channel.setRateLimitPerUser(duration);
            if (duration == 0) {
                await interaction.reply(
                    `this channel is no longer in slowmode(requested by ${interaction.user})`
                );
            } else {
                await interaction.reply(
                    `this channel is now in slowmode for ${duration} seconds (requested by ${interaction.user})`
                );
            }
        } catch (err) {
            console.log(err);
        }
    },
};
//DONE
