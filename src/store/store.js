import { configureStore } from "@reduxjs/toolkit";
import popUpReducer from "../features/popUpSlice";
import boardReducer from "../features/boardSlice";
import animationReducer from "../features/animationSlice";

export const store = configureStore({
    reducer: {
        popUp: popUpReducer,
        board: boardReducer,
        animation: animationReducer,
    },
});
