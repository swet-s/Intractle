import { createSlice } from "@reduxjs/toolkit";

const initialState = [...Array(26).keys()].reduce((acc, current) => {
    const letter = String.fromCharCode(current + 65);
    acc[letter] = 0;
    return acc;
}, {});

const setKeyState = (inputList, guessList, state, color) => {
    for (let i = 0; i < inputList.length; i++) {
        for (let j = 0; j < inputList[i].length; j++) {
            if (guessList[i][j] === color) {
                state[inputList[i][j]] = color;
            }
        }
    }
};

const keySlice = createSlice({
    name: "key",
    initialState: initialState,
    reducers: {
        setKeyFromGuess: (state, action) => {
            const { inputList, guessList } = action.payload;
            // Set key to gray first
            setKeyState(inputList, guessList, state, 1);
            // Overwrite key with yellow
            setKeyState(inputList, guessList, state, 2);
            // Set Green at very last
            setKeyState(inputList, guessList, state, 3);
        },
    },
});

export const { setKeyFromGuess } = keySlice.actions;
export default keySlice.reducer;
