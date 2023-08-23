const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.post('/', (req, res)=>{ 
    const newGame = new Game(req.body);
    newGame.save();

    res.send(req.body);
} )

module.exports = router