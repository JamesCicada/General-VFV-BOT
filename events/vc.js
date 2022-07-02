const { VoiceState } = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    /**
     *
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async execute(oldState, newState, client) {
        //console.log("loaded vc.js");
        const { member, guild } = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const joinToCreate = "992179944912339056";
        try {
            if (
                oldChannel !== newChannel &&
                newState.channelId === joinToCreate
            ) {
                const voiceChannel = await guild.channels.create(
                    `${member.user.username}'s vc`,
                    {
                        type: "GUILD_VOICE",
                        parent: newChannel.parent,
                        permissionOverwrites: [
                            { id: member.id, allow: ["CONNECT"] },
                        ],
                    }
                );
                client.voiceGenerator.set(member.id, voiceChannel.id);
                await newChannel.permissionOverwrites.edit(member, {
                    CONNECT: false,
                });
                setTimeout(
                    () => newChannel.permissionOverwrites.delete(member),
                    30 * 1000
                );

                return setTimeout(
                    () => member.voice.setChannel(voiceChannel),
                    500
                );
            }
            const ownedChannel = client.voiceGenerator.get(member.id);
            if (
                ownedChannel &&
                oldChannel.id == ownedChannel &&
                (!newChannel || newChannel.id !== ownedChannel)
            ) {
                client.voiceGenerator.set(member.id, null);
                oldChannel.delete().catch(() => {});
            }
        } catch (err) {
            console.log(err);
        }

        //console.log(client.voiceGenerator.get(member.id));
    },
};
