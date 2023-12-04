import { createSlice } from "@reduxjs/toolkit";

// Gotta add more stuff in future
const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: "swet123",
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
