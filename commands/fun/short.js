const { SlashCommandBuilder } = require("@discordjs/builders");
const shortUrl = require("node-url-shortener");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("short")
        .setDescription("a url Shortener")
        .addStringOption((option) =>
            option
                .setName("url")
                .setDescription("the long url")
                .setRequired(true)
        ),
    async execute(interaction) {
        let baseUrl = interaction.options.getString("url");
        if (!baseUrl.includes(".")) {
            interaction.reply({
                content: "this is not a url (i.e www.google.com)",
                ephemeral: true,
            });
        } else {
            shortUrl.short(`${baseUrl}`, function (err, url) {
                interaction.reply(url);
            });
        }
    },
};
//DONE
