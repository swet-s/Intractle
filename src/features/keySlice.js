import { createSlice } from "@reduxjs/toolkit";

const initialKeyColor = [...Array(26).keys()].reduce(
    (acc, current) => {
        const letter = String.fromCharCode(current + 65);
        acc[letter] = 0;
        return acc;
    },
    { Enter: 0, Backspace: 0 }
);

const setKeyColor = (inputList, guessList, keyColors, color) => {
    for (let i = 0; i < inputList.length; i++) {
        for (let j = 0; j < inputList[i].length; j++) {
            if (guessList[i][j] === color) {
                keyColors[inputList[i][j]] = color;
            }
        }
    }
};

const keySlice = createSlice({
    name: "key",
    initialState: {
        keyColors: initialKeyColor,
    },
    reducers: {
        setKeyFromGuess: (state, action) => {
            const { inputList, guessList } = action.payload;
            // Set key to gray first
            setKeyColor(inputList, guessList, state.keyColors, 1);
            // Overwrite key with yellow
            setKeyColor(inputList, guessList, state.keyColors, 2);
            // Set Green at very last
            setKeyColor(inputList, guessList, state.keyColors, 3);
        },

        resetKey: (state) => {
            state.keyColors = initialKeyColor;
        },
    },
});

export const { setKeyFromGuess, resetKey } = keySlice.actions;
export default keySlice.reducer;
