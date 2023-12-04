const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    wordId: { type: Number, required: true, unique: true },
    word: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Word", wordSchema);
