import React, { useContext, useEffect } from "react";
import Key from "./Key";
import gameContext from "../context/gameContext";

const Keyboard = () => {
  const { onKeyPress } = useContext(gameContext);

  const keyRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const handleKeyPress = (event) => {
    const { key } = event;
    if (keyRows.flat().includes(key.toUpperCase())) {
      onKeyPress(key.toUpperCase());
    } else if (key === "Enter" || key === "Backspace") {
      onKeyPress(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="py-8 flex text-center" onKeyDown={handleKeyPress}>
      <div className="mx-auto">
        {keyRows.map((row, index) => (
          <div className="flex justify-center" key={index}>
            {row.map((key) => (
              <Key key={key} keyItem={key} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
