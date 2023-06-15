import React, { useContext, useEffect, useState } from "react";
import gameContext from "../context/gameContext";
// import { BGCOLORS, BORDERCOLORS } from "../constants/gameConstant";

export default function Cell(props) {
  const { inputList, guessList, isShaking } = useContext(gameContext);

  const textColor = ["text-black", "text-white", "text-white", "text-white"];

  const BGCOLORS = [
    "bg-intractle-default",
    "bg-intractle-gray",
    "bg-intractle-yellow",
    "bg-intractle-green",
  ];

  const BORDERCOLORS = [
    "border-intractle-default",
    "border-intractle-gray",
    "border-intractle-yellow",
    "border-intractle-green",
    "border-intractle-selected",
  ];

  const COLORFADE = [
    "",
    "color-fade-gray",
    "color-fade-yellow",
    "color-fade-green"
  ]

  const [input, setInput] = useState("");
  const [cellState, setCellState] = useState(0); // default, gray, yellow, green, (selected)
  const [cellSelect, setCellSelect] = useState(false);

  const [shaking, setShaking] = useState("");
  const [colorFade, setColorFade] = useState("");

  useEffect(() => {
    if (
      props.row === inputList.length - 1 &&
      props.col == inputList[props.row].length
    ) {
      setCellSelect(true);
    } else {
      setCellSelect(false);
    }

    if (inputList.length > props.row) {
      if (inputList[props.row].length > props.col) {
        setInput(inputList[props.row][props.col]);
      } else {
        setInput("");
      }
    }
  }, [inputList]);

  useEffect(() => {
    if (guessList.length > props.row) {
      if (guessList[props.row].length > props.col) {
        setCellState(guessList[props.row][props.col]);
        setColorFade(COLORFADE[guessList[props.row][props.col]])
      }
    }
  }, [guessList]);

  useEffect(() => {
    if (props.row === inputList.length - 1 && isShaking) {
      setShaking("animate-shake");
    }
    else{
      setShaking("");
    }
  }, [isShaking]);

  const borderColor = cellSelect ? BORDERCOLORS[4] : BORDERCOLORS[cellState];
  const bgColor = BGCOLORS[cellState];

  return (
    <div
      className={` ${shaking} ${colorFade} flex items-center justify-center m-0.5 w-11 h-11 border-2 ${bgColor} ${borderColor}`}
    >
      <div className={`font-semibold text-xl ${textColor[cellState]}`}>
        {input}
      </div>
    </div>
  );
}
