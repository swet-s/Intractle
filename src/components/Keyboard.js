import React, { useEffect } from "react";
import Key from "./Key";
import { handleInput, setBoardShake } from "../features/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import verifyWord from "../utils/verifyWord";
import { COLUMN } from "../constants/gameConstant";

const Keyboard = () => {
    const dispatch = useDispatch();

    const inputList = useSelector((state) => state.board.inputList);

    const keyRows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ];

    const handleKeyPress = async (event) => {
        const { key } = event;

        try {
            if (key === "Enter") {
                verifyWord(inputList[inputList.length - 1]).then((verifyResult) => {
                    if (verifyResult === true) dispatch(handleInput(key));
                    else if (inputList[inputList.length - 1].length === COLUMN) {
                        dispatch(setBoardShake(true));
                        setTimeout(() => {
                            dispatch(setBoardShake(false));
                        }, 500); // Reset shaking after 0.5 second
                    }
                });
            } else dispatch(handleInput(key));
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
