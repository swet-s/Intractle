import React, { useEffect, useState } from "react";
import gameContext from "./gameContext";
import { ROW, COLUMN } from "../constants/gameConstant";
import wordBank from "../res/wordle-bank.txt";

export default function GameState(props) {
  const [popUpWindow, setPopUpWindow] = useState(false);

  const [inputList, setInputList] = useState([""]);
  const [guessList, setGuessList] = useState([]);

  const [currWord, setCurrWord] = useState("HELLO");

  useEffect(() => {
    generateWordSet()
    .then((result) => {
      console.log(result.todaysWord);
      // setCurrWord(result.todaysWord);
    });
  }, []);

  const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        const wordArr = result.split("\n");
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
  };

  return (
    <gameContext.Provider value={gameContextValue}>
      {props.children}
    </gameContext.Provider>
  );
}
