const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const currentTimeSinceEpoch = Date.now(); // Get current time since the epoch in milliseconds
  const currentDate = new Date(currentTimeSinceEpoch);

  // Get the local time
  const localFormattedDate = currentDate.toLocaleString();

  // Get the GMT (UTC) time
  const gmtFormattedDate = currentDate.toUTCString();

  const randomNumber = Math.floor(Math.random() * 2315); // Generate a random number between 0 and 2314
  
  // Get the time zone information
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  
  const result = {
    currentTime: currentTimeSinceEpoch,
    UTCTime: gmtFormattedDate,
    localTime: localFormattedDate,
    timeZone: timeZone,
    randomNumber: randomNumber
  };

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
