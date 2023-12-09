const express = require("express");
const Game = require("../models/Game");
const Word = require("../models/Word");
const User = require("../models/User");
const router = express.Router();

const getUTCDateAsString = require("../utils/dateUtils");

// Get current word of the day using current date.
router.get("/word", async (req, res) => {
    // Calculate the number of days
    const daysPassed = Math.floor(Date.now() / 86400000);
    const wordId = daysPassed % 2315; //

    try {
        const wordObj = await Word.findOne({ wordId });

        if (!wordObj) {
            return res.status(404).json({ status: 0, message: "Word not found.", wordId });
        }

        return res.json({ status: 1, word: wordObj.word });
    } catch (error) {
        console.error("Error fetching word:", error);
        res.status(500).json({ message: "An error occurred.", error });
    }
});

// Get game using a userID and current date.
router.get("/:userID", async (req, res) => {
    const { userID } = req.params;
    const gameDate = getUTCDateAsString();

    try {
        const game = await Game.findOne({ userID, gameDate });

        if (!game) {
            return res.json({ status: 0, message: "Game not found." });
        }

        return res.json({ status: 1, data: game });
    } catch (error) {
        console.error("Error fetching game:", error);
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
                status: 1,
                message: "Game created successfully.",
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
                status: 1,
                message: "Word appended successfully.",
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
            return res.json({ status: 0, message: "Game not found." });
        }

        return res.json({
            status: 1,
            message: "Game status updated successfully.",
            updatedGame: game,
        });
    } catch (error) {
        console.error("Error updating game status:", error);
        res.status(500).json({ message: "An error occurred.", error });
    }
});

// add game for specific user
router.put("/addgame", async (req, res) => {
    try {
        const { userID, gameStatus, attempt } = req.body;

        // Check if the user exists
        let user = await User.findOne({ userID });

        // If user does not exist, create one
        if (!user) {
            user = await User.create({
                userID,
                numberOfGamesPlayed: 0,
                currentStreak: 0,
                bestStreak: 0,
                attempts: [0, 0, 0, 0, 0, 0, 0],
            });
        }

        // Increment attempts
        if (attempt == 0) {
            user.attempts[0]++;
            user.currentStreak = 0;
        } else if (attempt >= 1 && attempt <= 6) {
            user.attempts[attempt]++;
            user.currentStreak = user.currentStreak + 1;
        } else {
            return res.status(400).json({ error: "Invalid attempt number" });
        }

        // Update other user stats
        user.numberOfGamesPlayed++;
        user.bestStreak = Math.max(user.bestStreak, user.currentStreak);

        // Save the updated user
        await user.save();

        res.json({ message: "Game added successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get user info using a userID.
router.get("/user/:userID", async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findOne({ userID });

        if (!user) {
            return res.json({ status: 0, message: "User not found." });
        }

        return res.json({ status: 1, data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "An error occurred." });
    }
});

module.exports = router;
