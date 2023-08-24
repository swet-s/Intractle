const mongoose = require("mongoose");
const getUTCDateAsString = require("../utils/dateUtils");

const gameSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  gameDate: {
    type: String,
    required: true,
    default: getUTCDateAsString,
  },
  gameStatus: {
    type: String,
    enum: ["PLAYING", "WON", "LOST"],
    default: "PLAYING",
  },
  wordList: { type: [String], default: [] },
});

// Create a compound unique index on userID and gameDate
gameSchema.index({ userID: 1, gameDate: 1 }, { unique: true });

module.exports = mongoose.model("Game", gameSchema);
