const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("a random gif based on your search word")
        .addStringOption((option) =>
            option
                .setName("keyword")
                .setDescription("what are you searching for?")
                .setRequired(true)
        ),
    async execute(interaction) {
        let gifWord = interaction.options.getString("keyword");
        let gifKey = process.env.GIPHY;
        let splitWord = gifWord.toString().split(" ");
        try {
            // Loop through incase of multiple word search
            for (var i = 1; i < splitWord.length; i++) {
                if (i > 1) {
                    gifWord = gifWord + "+";
                }

                gifWord = gifWord + splitWord[i];
            }

            request(
                "http://api.giphy.com/v1/gifs/search?q=" +
                    gifWord +
                    "&api_key=" +
                    gifKey +
                    "&limit=100",
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Convert body to JSON object
                        let jsonUrl = JSON.parse(body);

                        // Get random number to choose GIF
                        let totGif = jsonUrl.data.length;

                        if (totGif > 100) {
                            totGif = 100;
                        }

                        let ranNum = Math.floor(Math.random() * totGif);
                        //console.log(jsonUrl.data[ranNum].url);
                        interaction.reply(jsonUrl.data[ranNum].url);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
};
