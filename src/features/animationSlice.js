import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name: "animation",
    initialState: {
        loading: true,
        boardShake: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBoardShake: (state, action) => {
            state.boardShake = action.payload;
        },
    },
});

export const { setLoading, setBoardShake } = animationSlice.actions;
export default animationSlice.reducer;
