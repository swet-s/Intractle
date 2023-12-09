const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: { type: String, unique: true, required: true },
    numberOfGamesPlayed: { type: Number, default: 0, required: true },
    attempts: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0], required: true },
    currentStreak: { type: Number, default: 0, required: true },
    bestStreak: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model("User", userSchema);
