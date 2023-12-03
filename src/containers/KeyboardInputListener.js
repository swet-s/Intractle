import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import verifyWord from "../utils/verifyWord";
import { addLetter, handleEnter, removeLetter, toggleBoardShake } from "../features/boardSlice";

const KeyboardInputListener = ({ keyRows }) => {
    const dispatch = useDispatch();
    const inputList = useSelector((state) => state.board.inputList);

    const handleKeyPress = async (event) => {
        const { key } = event;

        // Call an asynchronous function
        try {
            const result = await onKeyPress(key);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const onKeyPress = async (key) => {
        if (keyRows.flat().includes(key.toUpperCase())) {
            dispatch(addLetter(key.toUpperCase()));
        } else if (key === "Enter") {
            const verifyResult = await verifyWord(inputList[inputList.length - 1]);
            console.log(verifyResult, inputList);
            if (verifyResult === true) dispatch(handleEnter());
            else {
                // setIsShaking(true);
                //         setTimeout(() => {
                //             setIsShaking(false);
                //         }, 500);// Reset shaking after 0.5 second
                toggleBoardShake();
            }
        } else if (key === "Backspace") {
            dispatch(removeLetter());
        }
    };

    return null;
};

export default KeyboardInputListener;
