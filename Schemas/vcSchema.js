const mongoose = require("mongoose");
const vcSchema = new mongoose.Schema({
    channelID: {
        type: Number,
    },
    guildID: {
        type: Number,
    },
    ownerID: {
        type: Number,
    },
    channelName: {
        type: String,
    },
});
module.exports = mongoose.model("vcDB", vcSchema);
