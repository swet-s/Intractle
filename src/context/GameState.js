import React, { useEffect, useState } from "react";
import gameContext from "./gameContext";
import { ROW, COLUMN } from "../constants/gameConstant";
import validWord from "../res/valid-word.txt";
import calculateGuess from "../utills/wordGuess";
import { getCurrWord, getGame } from "../api/game";
import { useDispatch } from "react-redux";
import { setPopUpStateLost, setPopUpStateWon } from "../features/popUpSlice";

export default function GameState(props) {
    const dispatch = useDispatch();

    const [inputList, setInputList] = useState([""]);
    const [guessList, setGuessList] = useState([]);

    const [currWord, setCurrWord] = useState("");
    const [wordSet, setWordSet] = useState();
    const [gameStatus, setGameStatus] = useState("PLAYING");

    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (gameStatus === "WON") {
            // SET WIN POPUP TO TRUE
            dispatch(setPopUpStateWon());
            // Todo: prevent futher input
        } else if (gameStatus === "LOST") {
            // DO SOMETHING
            dispatch(setPopUpStateLost());
        }
    }, [gameStatus]);

    useEffect(() => {
        getGame("swet123").then((res) => {
            // Found the game with userId
            if (res.status === 1) {
                const gameData = res.gameData;
                setGuessList(gameData.guessList);
                setInputList([...gameData.wordList, ""]);
                setGameStatus(gameData.gameStatus);
            }
        });

        getCurrWord().then((res) => {
            setCurrWord(res.word);
        });

        generateWordSet().then((result) => {
            setWordSet(result);
        });
    }, []);

    const generateWordSet = async () => {
        let wordSet;
        await fetch(validWord)
            .then((response) => response.text())
            .then((result) => {
                let wordArr = result.split("\n");
                wordArr = wordArr.map((word) => word.replace(/\r/g, ""));
                wordSet = new Set(wordArr);
            });
        return wordSet;
    };

    const onKeyPress = (key) => {
        if (key === "Backspace") {
            setInputList((prevList) => {
                const updatedList = [...prevList];
                updatedList[updatedList.length - 1] = updatedList[updatedList.length - 1].slice(
                    0,
                    -1
                );
                return updatedList;
            });
        } else if (key === "Enter") {
            setInputList((prevList) => {
                let currList = [...prevList];
                if (
                    currList[currList.length - 1].length === COLUMN &&
                    verifyWord(currList[currList.length - 1])
                ) {
                    if (currWord == currList[currList.length - 1]) {
                        setGameStatus("WON");
                        //TODO also set gameStatus at backend
                    } else if (currList.length == ROW) {
                        setGameStatus("LOST");
                        //TODO also set gameStatus at backend
                    }
                    currList = [...currList, ""];
                }
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

        setGuessList((prevList) => [...prevList, calculateGuess(guessWord, currWord)]);
        return true;
    };

    const gameContextValue = {
        currWord,
        onKeyPress,
        inputList,
        guessList,
        isShaking,
    };

    return <gameContext.Provider value={gameContextValue}>{props.children}</gameContext.Provider>;
}
