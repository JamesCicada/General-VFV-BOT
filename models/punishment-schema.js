const mongoose = require('mongoose');
const { Schema } = mongoose;
const reqString = {
    type: String,
    required: true,
}

const schema = new Schema(
    {
        userId: reqString,
        guildId: reqString,
        staffId: reqString,
        reason: reqString,
        expires: Date,
        type: {
            type: String,
            required: true,
            enum: ['ban', 'mute'],
        },
    },
    {
        timestamps: true,
    }
)

const name = 'punish'
module.exports = mongoose.model[name] || mongoose.model(name, schema)