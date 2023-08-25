const express = require("express");
const Game = require("../models/Game");
const router = express.Router();

const getUTCDateAsString = require("../utils/dateUtils");

router.put("/", async (req, res) => {
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
