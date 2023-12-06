import { createSlice } from "@reduxjs/toolkit";
import { COLUMN } from "../constants/gameConstant";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        inputList: [""],
        guessList: [],
        gameStatus: "PLAYING",
        gameWord: "",
    },
    reducers: {
        resetGame: (state) => {
            state.inputList = [""];
            state.guessList = [];
            state.gameStatus = "PLAYING";
        },

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

        handleInput: (state, action) => {
            if (state.gameStatus === "PLAYING") {
                let currList = [...state.inputList];

                if (/[A-Z]/.test(action.payload.toUpperCase()) && action.payload.length === 1) {
                    if (currList[currList.length - 1].length < COLUMN) {
                        currList[currList.length - 1] += action.payload.toUpperCase();
                    }
                } else if (action.payload === "Backspace") {
                    if (currList.length > 0) {
                        currList[currList.length - 1] = currList[currList.length - 1].slice(0, -1);
                    }
                }

                state.inputList = currList;
            }
        },

        handleEnter: (state, action) => {
            state.inputList = [...state.inputList, ""];
            state.guessList = [...state.guessList, action.payload];
        },
    },
});

export const {
    resetGame,
    setInputList,
    setGuessList,
    setGameStatus,
    setGameWord,
    handleInput,
    handleEnter,
} = boardSlice.actions;
export default boardSlice.reducer;
