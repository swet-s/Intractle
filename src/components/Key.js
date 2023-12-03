import React, { useContext } from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";

export default function Key(props) {
    const handleClick = () => {
        // onKeyPress(props.keyItem); // need some work
        document.activeElement.blur(); //Helps tackle multiple input at once
    };

    const isSingleCharacter = props.keyItem.length === 1;
    const isBackspaceKey = props.keyItem === "Backspace";
    const isEnterKey = props.keyItem === "Enter";

    const buttonWidthClass = isSingleCharacter ? "w-8" : "w-auto";
    const buttonPaddingClass = isSingleCharacter ? "px-0" : "px-3";
    const keyTextClass = `font-bold ${isEnterKey ? "text-xs" : "text-sm"}`;

    return (
        <button
            className={`mx-0.5 my-0.5 h-11 ${buttonWidthClass} ${buttonPaddingClass} bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md`}
            onClick={handleClick}
        >
            {isBackspaceKey ? (
                <BackspaceIcon className="h-5 w-6" />
            ) : (
                <div className={keyTextClass}>{props.keyItem}</div>
            )}
        </button>
    );
}
