import { createSlice } from "@reduxjs/toolkit";
import { ROW, COLUMN } from "../constants/gameConstant";
import calculateGuess from "../utils/calculateGuess";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        inputList: [""],
        guessList: [],
        gameStatus: "PLAYING",
        gameWord: "",
        boardShake: false,
    },
    reducers: {
        setInputList: (state, action) => {
            state.inputList = action.payload;
        },
        setGuessList: (state, action) => {
            state.guessList = action.payload;
        },
        setGameStatus: (state, action) => {
            state.gameStatus = action.payload;
        },
        setGameWord: (state, action) => {
            state.gameWord = action.payload;
        },

        toggleBoardShake: (state) => {
            state.boardShake = !state.boardShake;
            console.log("toto");
        },

        addLetter: (state, action) => {
            if (state.gameStatus === "PLAYING") {
                const currList = [...state.inputList];

                if (currList[currList.length - 1].length < COLUMN) {
                    currList[currList.length - 1] += action.payload;
                }

                state.inputList = currList;
            }
        },
        removeLetter: (state) => {
            if (state.gameStatus === "PLAYING") {
                const currList = [...state.inputList];

                if (currList.length > 0) {
                    currList[currList.length - 1] = currList[currList.length - 1].slice(0, -1);
                }

                state.inputList = currList;
            }
        },
        handleEnter: (state) => {
            if (state.gameStatus === "PLAYING") {
                let currList = [...state.inputList];

                if (currList[currList.length - 1].length === COLUMN) {
                    state.guessList = [
                        ...state.guessList,
                        calculateGuess(currList[currList.length - 1], state.gameWord),
                    ];

                    if (state.gameWord === currList[currList.length - 1]) {
                        state.gameStatus = "WON";
                        // TODO: Set gameStatus at backend
                    } else if (currList.length === ROW) {
                        state.gameStatus = "LOST";
                        // TODO: Set gameStatus at backend
                    }
                    currList = [...currList, ""];
                }
                state.inputList = currList;
            }
        },
    },
});

export const {
    setInputList,
    setGuessList,
    setGameStatus,
    setGameWord,
    toggleBoardShake,
    addLetter,
    removeLetter,
    handleEnter,
} = boardSlice.actions;
export default boardSlice.reducer;
