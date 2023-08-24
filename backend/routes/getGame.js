const express = require("express");
const Game = require("../models/Game");
const router = express.Router();

const getUTCDateAsString = require("../utils/dateUtils");

router.get("/:userID", async (req, res) => {
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

module.exports = router;
