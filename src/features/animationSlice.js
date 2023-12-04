import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name: "animation",
    initialState: {
        loading: true,
        boardShake: false,
    },
    reducers: {
        stopLoading: (state) => {
            state.loading = false;
        },
        setBoardShake: (state, action) => {
            state.boardShake = action.payload;
        },
    },
});

export const { stopLoading, setBoardShake } = animationSlice.actions;
export default animationSlice.reducer;
