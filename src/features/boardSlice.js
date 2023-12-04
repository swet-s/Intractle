import { createSlice } from "@reduxjs/toolkit";
import { ROW, COLUMN } from "../constants/gameConstant";
import calculateGuess from "../utils/calculateGuess";

// TODO: set update board state at backend
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

        setBoardShake: (state, action) => {
            state.boardShake = action.payload;
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
                } else if (action.payload === "Enter") {
                    //be careful
                    if (currList[currList.length - 1].length === COLUMN) {
                        state.guessList = [
                            ...state.guessList,
                            calculateGuess(currList[currList.length - 1], state.gameWord),
                        ];

                        if (state.gameWord === currList[currList.length - 1])
                            state.gameStatus = "WON";
                        else if (currList.length === ROW) state.gameStatus = "LOST";

                        currList = [...currList, ""];
                    }
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
    setBoardShake,
    handleInput,
} = boardSlice.actions;
export default boardSlice.reducer;
