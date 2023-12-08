import validWord from "../res/valid-word.txt";
import { COLUMN } from "../constants/gameConstant";

let cachedWordSet;

const generateWordSet = async () => {
    if (!cachedWordSet) {
        const response = await fetch(validWord);
        const result = await response.text();
        const wordArr = result.split("\n").map((word) => word.replace(/\r/g, ""));
        cachedWordSet = new Set(wordArr);
    }
    return cachedWordSet;
};

async function verifyWord(guessWord) {
    if (guessWord.length !== COLUMN) return false;
    const wordSet = await generateWordSet();
    if (!wordSet.has(guessWord)) return false;
    return true;
}

export default verifyWord;
