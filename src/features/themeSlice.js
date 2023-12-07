// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to get the initial dark mode setting from local storage
const getInitialDarkMode = () => {
    return localStorage.getItem("darkMode") === "true";
};

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        darkMode: getInitialDarkMode(),
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;

            // Save the updated dark mode setting to local storage
            localStorage.setItem("darkMode", state.darkMode);
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
