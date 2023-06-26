import React, { useEffect, useState } from "react";
import gameContext from "./gameContext";
import { ROW, COLUMN } from "../constants/gameConstant";
import validWord from "../res/valid-word.txt";
// import wordBank from "../res/word-bank.txt";

export default function GameState(props) {
  const [popUpWindow, setPopUpWindow] = useState(false);

  const [inputList, setInputList] = useState([""]);
  const [guessList, setGuessList] = useState([]);

  const [currWord, setCurrWord] = useState("");
  const [wordSet, setWordSet] = useState();
  
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    generateWordSet().then((result) => {
      setCurrWord(result.todaysWord.toUpperCase());
      setWordSet(result.wordSet);
    });
  }, []);

  const generateWordSet = async () => {
    let todaysWord;
    let wordSet;
    await fetch(validWord)
      .then((response) => response.text())
      .then((result) => {
        let wordArr = result.split("\n");
        wordArr = wordArr.map((word) => word.replace(/\r/g, ''));
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        wordSet = new Set(wordArr);
      });
    return { wordSet, todaysWord };
  };

  const onKeyPress = (key) => {
    if (key === "Backspace") {
      setInputList((prevList) => {
        const updatedList = [...prevList];
        updatedList[updatedList.length - 1] = updatedList[
          updatedList.length - 1
        ].slice(0, -1);
        return updatedList;
      });
    } else if (key === "Enter") {
      setInputList((prevList) => {
        let currList = [...prevList];
        if (
          currList[currList.length - 1].length === COLUMN &&
          verifyWord(currList[currList.length - 1])
        )
          currList = [...currList, ""];
        return currList;
      });
    } else {
      setInputList((prevList) => {
        const currList = [...prevList];
        if (currList[currList.length - 1].length < COLUMN)
          currList[currList.length - 1] += key;
        return currList;
      });
    }
  };

  const verifyWord = (guessWord) => {
    if (!wordSet.has(guessWord)) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500); // Reset shaking after 0.5 second
      return false;
    }

    let guess = Array(COLUMN).fill(0);
    let left = currWord;

    // check correct/incorrect letters first
    for (let i = 0; i < COLUMN; i++) {
      if (guessWord[i] === currWord[i]) {
        guess[i] = 3;
        left = left.substring(0, i) + " " + left.substring(i + 1);
      } else if (!currWord.includes(guessWord[i])) {
        guess[i] = 1;
      }
    }

    // check wrong spots after
    for (let i = 0; i < COLUMN; i++) {
      if (guess[i] !== 3 && guess[i] !== 1) {
        if (left.includes(guessWord[i])) {
          guess[i] = 2;
          let index = left.indexOf(guessWord[i]);
          left = left.substring(0, index) + " " + left.substring(index + 1);
        } else {
          guess[i] = 1;
        }
      }
    }
    setGuessList((prevList) => [...prevList, guess]);
    return true;
  };

  const togglePopUpWindow = () => {
    setPopUpWindow((prevValue) => !prevValue);
  };

  const gameContextValue = {
    popUpWindow,
    togglePopUpWindow,
    onKeyPress,
    inputList,
    guessList,
    isShaking,
  };

  return (
    <gameContext.Provider value={gameContextValue}>
      {props.children}
    </gameContext.Provider>
  );
}
