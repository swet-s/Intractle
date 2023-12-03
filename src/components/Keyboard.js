import React from "react";
import Key from "./Key";
import KeyboardInputListener from "../containers/KeyboardInputListener";

const Keyboard = () => {
    const keyRows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ];

    return (
        <>
            <KeyboardInputListener keyRows={keyRows} />
            <div
                className="pb-14 pt-4 fixed sm:static bottom-0 left-0 w-full z-20
            sm:bg-transparent "
            >
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
        </>
    );
};

export default Keyboard;
