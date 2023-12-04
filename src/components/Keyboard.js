import React, { useEffect } from "react";
import Key from "./Key";
import { handleEnter, handleInput, setGameStatus } from "../features/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import verifyWord from "../utils/verifyWord";
import { COLUMN, ROW } from "../constants/gameConstant";
import { setBoardShake } from "../features/animationSlice";
import { appendWord, updateGameStatus } from "../api/game";
import calculateGuess from "../utils/calculateGuess";

const Keyboard = () => {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.userId);
    const inputList = useSelector((state) => state.board.inputList);
    const gameWord = useSelector((state) => state.board.gameWord);
    const loading = useSelector((state) => state.animation.loading);

    const keyRows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ];

    const handleKeyPress = async (event) => {
        const { key } = event;

        try {
            if (!loading) {
                if (key === "Enter") {
                    const currWord = inputList[inputList.length - 1];

                    if (currWord.length === COLUMN) {
                        verifyWord(currWord).then((verifyResult) => {
                            if (verifyResult == true) {
                                const guess = calculateGuess(currWord, gameWord);

                                dispatch(handleEnter(guess));

                                if (gameWord === currWord) {
                                    dispatch(setGameStatus("WON"));
                                    updateGameStatus(userId, "WON"); // update game status to backend
                                } else if (inputList.length >= ROW) {
                                    //be careful
                                    dispatch(setGameStatus("LOST"));
                                    updateGameStatus(userId, "LOST"); // update game status to backend
                                }

                                appendWord(userId, currWord, guess); //append word to backend
                            } else {
                                dispatch(setBoardShake(true));
                                setTimeout(() => {
                                    dispatch(setBoardShake(false));
                                }, 500); // Reset shaking after 0.5 second
                            }
                        });
                    }
                } else {
                    dispatch(handleInput(key));
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]); //Its required

    return (
        <div
            className="pb-14 pt-4 fixed sm:static bottom-0 left-0 w-full z-20
            sm:bg-transparent "
        >
            <div className="mx-auto">
                {keyRows.map((row, index) => (
                    <div className="flex justify-center" key={index}>
                        {row.map((key) => (
                            <Key
                                key={key}
                                keyItem={key}
                                onKeyPress={() => {
                                    handleKeyPress({ key });
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
