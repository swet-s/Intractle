import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
    name: "popUp",
    initialState: {
        isPopUpWindowOpen: false,
        popUpState: "",
    },
    reducers: {
        ClosePopUp: (state) => {
            state.popUpState = "";
            state.isPopUpWindowOpen = false;
        },

        PopUpMenu: (state) => {
            state.popUpState = "MENU";
            state.isPopUpWindowOpen = true;
        },
        PopUpLogin: (state) => {
            state.popUpState = "LOGIN";
            state.isPopUpWindowOpen = true;
        },
        PopUpUser: (state) => {
            state.popUpState = "USER";
            state.isPopUpWindowOpen = true;
        },
        PopUpWon: (state) => {
            state.popUpState = "WON";
            state.isPopUpWindowOpen = true;
        },
        PopUpLost: (state) => {
            state.popUpState = "LOST";
            state.isPopUpWindowOpen = true;
        },
        PopUpGuide: (state) => {
            state.popUpState = "GUIDE";
            state.isPopUpWindowOpen = true;
        },
        PopUpStats: (state) => {
            state.popUpState = "STATS";
            state.isPopUpWindowOpen = true;
        },
        PopUpSetting: (state) => {
            state.popUpState = "SETTING";
            state.isPopUpWindowOpen = true;
        },
    },
});

export const {
    ClosePopUp,
    PopUpMenu,
    PopUpLogin,
    PopUpUser,
    PopUpWon,
    PopUpLost,
    PopUpGuide,
    PopUpStats,
    PopUpSetting,
} = popUpSlice.actions;
export default popUpSlice.reducer;
