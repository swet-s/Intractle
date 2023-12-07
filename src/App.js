import React from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import PopUpWindow from "./components/PopUpWindow";
import PullData from "./containers/PullData";
import Loading from "./components/tools/Loading";
import { useSelector } from "react-redux";

export default function App() {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <>
            <PullData />
            <div className={`App ${darkMode ? "bg-slate-900" : "bg-slate-100"} min-h-screen`}>
                <Navbar name="Intractle" />
                <Loading />
                <PopUpWindow />
                <Board />
                <Keyboard />
            </div>
        </>
    );
}
