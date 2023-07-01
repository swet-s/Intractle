import React from "react";
import GameState from "./context/GameState";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import PopUpWindow from "./components/PopUpWindow";

export default function App() {
  return (
    <GameState>
      <div className="App bg-slate-500 min-h-screen">
        <Navbar name="Intractle" />
        <PopUpWindow />
        <Board />
        <Keyboard />
      </div>
    </GameState>
  );
}
