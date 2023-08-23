const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  gameDate: { type: Date, required: true, default: Date.now },
  gamePlayed: { type: Boolean, default: false },
  wordList: { type: [String], default: [] },
  gameWon: { type: Boolean, default: false }
});

// Create a compound unique index on userID and gameDate
gameSchema.index({ userID: 1, gameDate: 1 }, { unique: true });

module.exports = mongoose.model('Game', gameSchema);
