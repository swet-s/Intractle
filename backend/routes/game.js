const express = require("express");
const Game = require("../models/Game");
const Word = require("../models/Word");
const router = express.Router();

const getUTCDateAsString = require("../utils/dateUtils");

// Get game using a userID and current date.
router.get("/user/:userID", async (req, res) => {
  const { userID } = req.params;
  const gameDate = getUTCDateAsString();

  try {
    const game = await Game.findOne({ userID, gameDate });

    if (!game) {
      return res.status(404).json({ message: "Game not found.", gameDate });
    }

    return res.json({ message: "Game found.", gameData: game });
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

// Get current word of the day using current date.
router.get("/word", async (req, res) => {
  // Calculate the number of days
  const daysPassed = Math.floor(Date.now() / 86400000);
  const wordId = daysPassed % 2315; // 

  try {
    const wordObj = await Word.findOne({ wordId });

    if (!wordObj) {
      return res.status(404).json({ message: "Word not found.", wordId });
    }

    return res.json({ message: "Word found.", word: wordObj.word });
  } catch (error) {
    console.error("Error fetching word:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

// Put word to the current game or create one.
router.put("/append", async (req, res) => {
  const { userID, word, guess } = req.body;

  const gameDate = getUTCDateAsString();

  try {
    let game = await Game.findOne({ userID, gameDate });

    if (!game) {
      // Create a new game if not found
      game = new Game({
        userID,
        gameDate,
        wordList: [word],
        guessList: [guess],
      });
      await game.save();

      return res.json({
        message: "Word appended successfully.",
        game: game,
      });
    } else {
      const result = await Game.updateOne(
        { userID, gameDate }, // Filter to find the game to update
        {
          $push: {
            wordList: word,
            guessList: guess,
          },
        } // Update operation: push the word to wordList and guess to guessList
      );

      return res.json({
        message: "Word appended successfully."
      });
    }
  } catch (error) {
    console.error("Error appending word:", error);
    res.status(500).json({ message: "An error occurred.", error });
  }
});

// Update the status of the game from PLAYING to WON/LOST
router.put("/status", async (req, res) => {
  const { userID, gameStatus } = req.body;

  const gameDate = getUTCDateAsString();

  try {
    const game = await Game.findOneAndUpdate(
      { userID, gameDate },
      { $set: { gameStatus } },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: "Game not found." });
    }

    return res.json({
      message: "Game status updated successfully.",
      updatedGame: game,
    });
  } catch (error) {
    console.error("Error updating game status:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

module.exports = router;
