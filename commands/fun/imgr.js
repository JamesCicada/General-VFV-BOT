const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require("request");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("imgr")
        .setDescription("a random image based on your search word")
        .addStringOption((option) =>
            option
                .setName("keyword")
                .setDescription("what are you searching for?")
                .setRequired(true)
        ),
    async execute(interaction) {
        let keyword = interaction.options
            .getString("keyword")
            .replace(" ", "%20");
        let googKey = process.env.GAPI;
        let cxKey = "7b9745b296b96be8e";
        let page = 1;

        request(
            "https://www.googleapis.com/customsearch/v1?key=" +
                googKey +
                "&cx=" +
                cxKey +
                "&q=" +
                keyword +
                "&searchType=image&alt=json&num=10&start=" +
                page,
            function (err, res, body) {
                let data;

                try {
                    data = JSON.parse(body);
                } catch (error) {
                    console.log(error);
                    return;
                }

                if (!data) {
                    console.log(data);
                    interaction.reply({
                        content: "Error:\n" + JSON.stringify(data),
                        ephemeral: true,
                    });
                    return;
                } else if (!data.items || data.items.length == 0) {
                    console.log(data);
                    interaction.reply("No result for '" + keyword + "'");
                    return;
                }
                // Get random number
                let ranNum = Math.floor(Math.random() * data.items.length);
                let randResult = data.items[ranNum];
                interaction.reply(randResult.title + "\n" + randResult.link);
            }
        );
    },
};
//DONE
/*let page = 1;

    request("https://www.googleapis.com/customsearch/v1?key=" + googKey + "&cx=" + cxKey + "&q=" + searchWrd + "&searchType=image&alt=json&num=10&start="+page, function(err, res, body) {
      let data;

      try {
        data = JSON.parse(body);
      } catch (error) {
        console.log(error)
        return;
      }

      if(!data){
        console.log(data);
        message.channel.sendMessage( "Error:\n" + JSON.stringify(data));
        return;
      } else if (!data.items || data.items.length == 0){
        console.log(data);
        message.channel.sendMessage( "No result for '" + args + "'");
        return;
      }
      // Get random number
      let ranNum = Math.floor(Math.random() * data.items.length);
      let randResult = data.items[ranNum];
      message.channel.sendMessage( randResult.title + '\n' + randResult.link);
    });
  }*/
