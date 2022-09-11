const moment = require("moment");
const mongoose = require("mongoose");
const memberSchema = require("../Schemas/addToDB");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        let date = moment(new Date().now);
        try {
            console.log(`Ready! Logged in as ${client.user.tag}`);
            await mongoose.connect(process.env.MONGO_URI, {
                keepAlive: true,
            });
            console.log("connected to mongoDB");
            let date = moment(new Date().now).format("HH");
            console.log(date);
            await memberSchema.findOneAndUpdate(
                {
                    discordID: 551893446726778901,
                },
                { botUptime: date }
            );
            await client.guilds.cache
                .get("825526271311478824")
                .channels.cache.get("1018326992829042708")
                .send(`𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡 started`);
        } catch (err) {
            console.log(err);
        }
        //client.user.setActivity(`/help`, { type: "WATCHING" });
        /*let handler = require("../command-handler");
        if (handler.default) handler = handler.default;

        handler(client);
        await mongoose.connect(
            process.env.MONGO_URI,
            {
                keepAlive: true,
            },
            console.log("connected to mongoDB for legacy commands")
        );*/
        console.log("𝐄𝐥𝐢𝐳𝐚𝐛𝐞𝐭𝐡 is ready");
    },
};
