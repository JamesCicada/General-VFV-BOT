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
        console.log(client.username + " is ready");
    },
};
