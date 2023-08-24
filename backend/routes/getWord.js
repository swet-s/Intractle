const express = require('express');
const router = express.Router();
const getUTCDateAsString = require("../utils/dateUtils");

router.get('/', (req, res)=>{ 
    const currentDate = getUTCDateAsString();
    const randomNumber = Math.floor(Math.random() * 2315); // Generate a random number between 0 and 2314

    const result = {
        currentDate: currentDate,
        randomNumber: randomNumber
    };

    res.json(result);
});
  
module.exports = router