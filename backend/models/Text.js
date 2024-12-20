const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    content: { type: String },
    userId: {
        type: String,
        required: true,
        unique: true,
        default: "admin",
    },
});
module.exports = mongoose.model("Text", textSchema);
