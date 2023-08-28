const fs = require('fs');

function shuffleAndConvertToJSON(inputFilePath) {
  // Read the content of the file
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const lines = data.split('\n'); // Split content into lines

    // Shuffle the array of lines using Fisher-Yates Shuffle
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }

    // Convert shuffled lines to JSON object
    const jsonObject = lines.map((res, index) => {
      return {
        wordId: index,
        word: res.trim(),
      };
    });

    // Save JSON object to a JSON file
    const outputFilePath = 'res/daily-word.json';
    fs.writeFile(outputFilePath, JSON.stringify(jsonObject, null, 2), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return;
      }
      console.log('JSON file saved successfully.');
    });
  });
}

shuffleAndConvertToJSON('./res/word-bank.txt');