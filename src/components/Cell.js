import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cell(props) {
    const inputList = useSelector((state) => state.board.inputList);
    const guessList = useSelector((state) => state.board.guessList);
    const gameStatus = useSelector((state) => state.board.gameStatus);
    const isShaking = useSelector((state) => state.animation.boardShake);
    const darkMode = useSelector((state) => state.theme.darkMode);

    const TEXTCOLOR = [
        darkMode ? "text-gray-300" : "text-black",
        "text-white",
        "text-white",
        "text-white",
    ];

    const BGCOLORS = [
        darkMode ? "bg-intractle-dark" : "bg-intractle-light",
        "bg-intractle-gray",
        "bg-intractle-yellow",
        "bg-intractle-green",
    ];

    const BORDERCOLORS = [
        darkMode ? "border-intractle-default-dark" : "border-intractle-default",
        "border-intractle-gray",
        "border-intractle-yellow",
        "border-intractle-green",
        "border-intractle-selected",
    ];

    const COLORFADE = [
        "",
        darkMode ? "color-fade-gray-dark" : "color-fade-gray",
        darkMode ? "color-fade-yellow-dark" : "color-fade-yellow",
        darkMode ? "color-fade-green-dark" : "color-fade-green",
    ];

    const [input, setInput] = useState("");
    const [cellState, setCellState] = useState(0); // default, gray, yellow, green, (selected)
    const [cellSelect, setCellSelect] = useState(false);

    const [shaking, setShaking] = useState("");
    const [colorFade, setColorFade] = useState("");

    useEffect(() => {
        if (props.row === inputList.length - 1 && props.col === inputList[props.row].length) {
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

        // Helps when game resets
        if (inputList.length === 1 && inputList[0] === "") {
            setInput("");
        }
    }, [inputList]);

    useEffect(() => {
        if (guessList.length > props.row) {
            if (guessList[props.row].length > props.col) {
                setCellState(guessList[props.row][props.col]);
                setColorFade(COLORFADE[guessList[props.row][props.col]]);
            }
        }

        // Helps when game resets
        if (guessList.length === 0) {
            setCellState(0);
        }
    }, [guessList]);

    useEffect(() => {
        if (props.row === inputList.length - 1 && isShaking) {
            setShaking("animate-shake");
        } else {
            setShaking("");
        }
    }, [isShaking]);

    const borderColor =
        cellSelect && gameStatus == "PLAYING" ? BORDERCOLORS[4] : BORDERCOLORS[cellState];
    const bgColor = BGCOLORS[cellState];

    return (
        <div
            className={`select-none ${shaking} ${colorFade} flex items-center justify-center m-0.5 w-14 h-14 sm:w-10 sm:h-10 border-2 ${bgColor} ${borderColor}`}
        >
            <div className={`font-semibold sm:text-xl text-2xl ${TEXTCOLOR[cellState]}`}>
                {input}
            </div>
        </div>
    );
}
