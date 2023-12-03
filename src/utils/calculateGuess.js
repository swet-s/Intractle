function calculateGuess(word, todaysWord) {
    let guess = Array(todaysWord.length).fill(0);
    let left = todaysWord;

    // check correct/incorrect letters first
    for (let i = 0; i < todaysWord.length; i++) {
        if (word[i] === todaysWord[i]) {
            guess[i] = 3;
            left = left.substring(0, i) + " " + left.substring(i + 1);
        } else if (!todaysWord.includes(word[i])) {
            guess[i] = 1;
        }
    }

    // check wrong spots after
    for (let i = 0; i < todaysWord.length; i++) {
        if (guess[i] !== 3 && guess[i] !== 1) {
            if (left.includes(word[i])) {
                guess[i] = 2;
                let index = left.indexOf(word[i]);
                left = left.substring(0, index) + " " + left.substring(index + 1);
            } else {
                guess[i] = 1;
            }
        }
    }
    return guess;
}

export default calculateGuess;
