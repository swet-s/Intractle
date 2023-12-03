import React from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import PopUpWindow from "./components/PopUpWindow";
import PullData from "./components/PullData";

export default function App() {
    return (
        <>
            <PullData />
            <div className="App bg-slate-100 min-h-screen">
                <Navbar name="Intractle" />
                <PopUpWindow />
                <Board />
                <Keyboard />
            </div>
        </>
    );
}
