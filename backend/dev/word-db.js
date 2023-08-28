const express = require("express");
const router = express.Router();
const dailyWords = require("./res/daily-word.json");
const Word = require("../models/Word");

router.post("/upload", async (req, res) => {
  try {
    // Insert the array of documents into the database
    const insertedData = await Word.insertMany(dailyWords);

    res.status(201).json({
      message: "Data inserted successfully",
      data: insertedData,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
      error,
    });
  }
});

module.exports = router;
