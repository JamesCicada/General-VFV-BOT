const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    discordId: {
        type: Number,
        required: true,
        unique: true,
    },
    wallet: {
        type: Number,
        required: true,
        default: 100,
    },
    ballance: {
        type: Number,
        required: true,
        default: 1000,
    },
    bday: {
        type: Date,
        required: false,
    },
    begTimeout: {
        type: String,
        required: true,
    },
    dailyCooldown: {
        type: String,
    },
    coinflipCooldown: {
        type: String,
    },
    coinflipLeft: {
        type: Number,
        default: 5,
    },
    textXp: {
        type: Number,
        default: 0,
    },
    voiceXp: {
        type: Number,
    },
    bonus: {
        type: Number,
    },
});
module.exports = mongoose.model("memberModels", memberSchema);
