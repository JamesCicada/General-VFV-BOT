const { execute } = require("./interactionCreate");

module.exports = {
    name: "guildMemberAdd",
    on: true,
    async execute(member, client) {
        client.on("guildMemberAdd", (member) => {
            let channel = member.guild.channels.cache.get(983769673831161887);

            let embed = new Discord.MessageEmbed()
                .setThumbnail(
                    "https://cdn.discordapp.com/avatars/933341730827276318/57d817db788fb5e5b143795aab71a898.png?size=1024" // make sure to change this to your image
                )
                .addField(
                    `:point_right: Welcome!`,
                    `Hello, welcome to ${member.guild.name} <@${member.user.id}>!`,
                    true
                )
                .addField(
                    `:zap: Guild Statistics`,
                    `Server member count: ${member.guild.memberCount}`,
                    true
                )
                .setColor("YELLOW")
                .setImage(
                    "https://media3.giphy.com/media/rUPuU6G4X0Pew/giphy.gif?cid=790b7611cc2cf3f2cbbb1f4ccf4e46157d6aa6785d5713c3&rid=giphy.gif&ct=g" // make sure to change this to your image
                );

            channel
                .find((channel) => channel.id === process.env.CHANNEL_ID)
                .send({ embeds: [embed] });
        });
    },
};
