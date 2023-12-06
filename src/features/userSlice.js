import { createSlice } from "@reduxjs/toolkit";

// Gotta add more stuff in future
const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        userName: null,
        photoUrl: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserPhotoUrl: (state, action) => {
            state.photoUrl = action.payload;
        },
    },
});

export const { setUserId, setUserName, setUserPhotoUrl } = userSlice.actions;
export default userSlice.reducer;
