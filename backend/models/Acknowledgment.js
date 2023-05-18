const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcknowledgmentSchema = new Schema({
    message: {
        type: String,
        default: "",
    },
    media: [{
        filename: {
            type: String,
        },
        selected: {
            type: Boolean,
            default: true
        },
        originalFilename: {
            type: String,
        },
        wassengerFileId: {
            type: String,
        },
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Acknowledgment", AcknowledgmentSchema);