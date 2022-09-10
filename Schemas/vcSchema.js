const mongoose = require("mongoose");
let Schema = mongoose.Schema;
require("mongoose-long")(mongoose);
const vcSchema = new mongoose.Schema({
    channelID: {
        type: Schema.Types.Long,
        min: 0,
        default: 0,
    },
    guildID: {
        type: Schema.Types.Long,
        min: 0,
        default: 0,
    },
    ownerID: {
        type: Schema.Types.Long,
        min: 0,
        default: 0,
    },
    channelName: {
        type: String,
    },
});
module.exports = mongoose.model("vcDB", vcSchema);
