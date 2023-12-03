import { configureStore } from "@reduxjs/toolkit";
import popUpReducer from "../features/popUpSlice";
import boardReducer from "../features/boardSlice";

export const store = configureStore({
    reducer: {
        popUp: popUpReducer,
        board: boardReducer,
    },
});
