const mongoose = require("mongoose");
const vcSchema = new mongoose.Schema({
    channelID: {
        type: Number,
    },
    guildId: {
        type: Number,
        required: true,
    },
    ownerID: {
        type: Number,
        unique: true,
    },
    channelName: {
        type: String,
    },
});
module.exports = mongoose.model("vcDB", vcSchema);
