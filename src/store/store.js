import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import popUpReducer from "../features/popUpSlice";
import boardReducer from "../features/boardSlice";
import animationReducer from "../features/animationSlice";
import themeReducer from "../features/themeSlice";
import kerReducer from "../features/keySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        popUp: popUpReducer,
        board: boardReducer,
        animation: animationReducer,
        theme: themeReducer,
        key: kerReducer,
    },
});
