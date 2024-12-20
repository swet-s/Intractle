const express = require("express");
const Text = require("../models/Text");
const router = express.Router();

// Get the latest text for a specific user
router.get("/", async (req, res) => {
    const userId = req.query.userId || "admin";
    try {
        const text = await Text.findOne({ userId }).select("content");
        if (text) res.json(text);
        else res.status(404).json({ error: "User not found" });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

// Update content for a specific user
router.put("/", async (req, res) => {
    const { content } = req.body;
    const userId = req.body.userId || "admin";

    try {
        let text = await Text.findOne({ userId });

        if (text) {
            text.content = content;
            await text.save();
            res.json({ message: `Content updated successfully for userId: ${userId}` });
        } else {
            const newText = new Text({ content, userId });
            await newText.save();
            res.json({ message: `Content created successfully for userId: ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating content" });
    }
});

module.exports = router;
