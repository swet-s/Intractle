import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
    name: "popUp",
    initialState: {
        isPopUpWindowOpen: false,
        popUpState: "",
    },
    reducers: {
        togglePopUpWindow: (state) => {
            state.isPopUpWindowOpen = !state.isPopUpWindowOpen;
        },
        setPopUpState: (state, action) => {
            state.popUpState = action.payload;
        },
        setPopUpStateWon: (state) => {
            state.popUpState = "WON";
            state.isPopUpWindowOpen = true;
        },
        setPopUpStateLost: (state) => {
            state.popUpState = "LOST";
            state.isPopUpWindowOpen = true;
        },
    },
});

export const { togglePopUpWindow, setPopUpState, setPopUpStateWon, setPopUpStateLost } =
    popUpSlice.actions;
export default popUpSlice.reducer;
