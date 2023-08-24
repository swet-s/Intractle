const express = require("express");
const Game = require("../models/Game");
const router = express.Router();

const getUTCDateAsString = require("../utils/dateUtils");

router.put("/", async (req, res) => {
  const { userID, word } = req.body;

  const gameDate = getUTCDateAsString();

  try {
    let game = await Game.findOne({ userID, gameDate });

    if (!game) {
      // Create a new game if not found
      game = new Game({
        userID,
        gameDate,
        wordList: [word],
      });
      await game.save();

      return res.json({
        message: "Word appended successfully.",
        updatedGame: game,
      });
    } else {
      const result = await Game.updateOne(
        { userID, gameDate }, // Filter to find the game to update
        { $push: { wordList: word } } // Update operation: push the word to wordList
      );

      return res.json({
        message: "Word appended successfully.",
        updatedResult: result,
      });
    }
  } catch (error) {
    console.error("Error appending word:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
});

module.exports = router;
