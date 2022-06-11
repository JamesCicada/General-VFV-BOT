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
        shortUrl.short(`${baseUrl}`, function (err, url) {
            console.log(url);
            interaction.reply(url);
        });
    },
};

/*const shortUrl = require('node-url-shortener')
module.exports = {
    callback: (message, ...args) => {
        
        shortUrl.short(`${args}`, function (err, url) {
            console.log(url);
            message.reply(url)
        });
        
    }
}*/
//DONE
