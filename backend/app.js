require("dotenv").config();
const express = require('express');
// const cors = require("cors");

const connectDB = require('./db');
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//   const currentTimeSinceEpoch = Date.now(); // Get current time since the epoch in milliseconds
//   const currentDate = new Date(currentTimeSinceEpoch);

//   const gmtFormattedDate = currentDate.toUTCString();

//   const randomNumber = Math.floor(Math.random() * 2315); // Generate a random number between 0 and 2314
  
//   const result = {
//     currentTime: currentTimeSinceEpoch,
//     UTCTime: gmtFormattedDate,
//     randomNumber: randomNumber
//   };

//   res.json(result);
// });


// Available Routes
app.use('/game/submit', require('./routes/word-submit'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
