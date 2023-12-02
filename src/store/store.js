import { configureStore } from "@reduxjs/toolkit";
import popUpReducer from "../features/popUpSlice";

export const store = configureStore({
    reducer: {
        popUp: popUpReducer,
    },
});
