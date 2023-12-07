import React from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import PopUpWindow from "./components/PopUpWindow";
import PullData from "./containers/PullData";
import { useSelector } from "react-redux";

export default function App() {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <>
            <PullData />
            <div
                className={`fixed App ${
                    darkMode ? "bg-slate-900" : "bg-slate-100"
                } w-screen h-screen`}
            >
                <Navbar name="Intractle" />
                <PopUpWindow />
                <Board />
                <Keyboard />
            </div>
        </>
    );
}
