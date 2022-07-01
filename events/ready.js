const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            console.log(`Ready! Logged in as ${client.user.tag}`);
            await mongoose.connect(process.env.MONGO_URI, {
                keepAlive: true,
            });
            console.log("connected to mongoDB");
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
        console.log("V FOR VENDETTA is online");
    },
};
