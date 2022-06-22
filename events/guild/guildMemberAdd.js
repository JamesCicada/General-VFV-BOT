const memberModel = require("../../Schemas/addToDB");
const { execute } = require("../interactionCreate");

module.exports = {
    name: "guildMemberAdd",
    once: true,
    async execute(member) {
        console.log("a member joined the server");
        try {
            let profile = await new memberModel({
                username: member.tag,
                discordId: member.id,
                wallet: 100,
                ballance: 1000,
            });
            profile.save();
            console.log("added profile successfully");
        } catch (err) {
            console.log(err);
        }
    },
};
/*module.exports = {
    name: "interactionCreate",
    once: true,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    },
};*/
