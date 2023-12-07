import React from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Key({ keyItem, onKeyPress }) {
    const darkMode = useSelector((state) => state.theme.darkMode);

    const handleClick = () => {
        onKeyPress();
        document.activeElement.blur(); //Helps tackle multiple input at once
    };

    const isSingleCharacter = keyItem.length === 1;
    const isBackspaceKey = keyItem === "Backspace";
    const isEnterKey = keyItem === "Enter";

    const buttonWidthClass = isSingleCharacter ? "w-8" : "w-auto";
    const buttonPaddingClass = isSingleCharacter ? "px-0" : "px-3";
    const keyTextClass = `font-bold ${isEnterKey ? "text-xs" : "text-sm"}`;

    const bgColor = darkMode ? "bg-gray-700" : "bg-gray-300";
    const bgColorHover = darkMode ? "hover:bg-gray-600" : "hover:bg-gray-400";
    const bgColorActive = darkMode ? "active:bg-gray-500" : "active:bg-gray-500";
    const color = darkMode ? "text-gray-100" : "text-gray-900";

    return (
        <button
            className={`mx-0.5 my-0.5 h-11  ${buttonWidthClass} ${buttonPaddingClass}  ${bgColor} ${bgColorHover} ${bgColorActive} ${color} rounded-md`}
            onClick={handleClick}
        >
            {isBackspaceKey ? (
                <BackspaceIcon className="h-5 w-6" />
            ) : (
                <div className={keyTextClass}>{keyItem}</div>
            )}
        </button>
    );
}
