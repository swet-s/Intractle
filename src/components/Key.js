import React from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Key({ keyItem, onKeyPress }) {
    const darkMode = useSelector((state) => state.theme.darkMode);

    const keyState = useSelector((state) => state.key);

    const BGCOLORS = [
        darkMode ? "bg-gray-700" : "bg-intractle-default",
        "bg-intractle-gray",
        "bg-intractle-yellow",
        "bg-intractle-green",
    ];

    const BGCOLORS_HOVER = [
        darkMode ? "hover:bg-gray-600" : "hover:bg-gray-400",
        "hover:bg-gray-600",
        "hover:bg-yellow-600",
        "hover:bg-green-700",
    ];

    const BGCOLORS_ACTIVE = [
        "active:bg-gray-500",
        "active:bg-gray-700",
        "active:bg-yellow-700",
        "active:bg-green-800",
    ];

    const COLORS = [
        darkMode ? "text-gray-100" : "text-gray-900",
        "text-gray-100",
        "text-gray-100",
        "text-gray-100",
    ];

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

    let bgColor, bgColorHover, bgColorActive, color;

    if (keyItem === "Enter" || keyItem === "Backspace") {
        bgColor = darkMode ? "bg-gray-700" : "bg-intractle-default";
        bgColorHover = darkMode ? "hover:bg-gray-600" : "hover:bg-gray-400";
        bgColorActive = "active:bg-gray-500";
        color = darkMode ? "text-gray-100" : "text-gray-900";
    } else {
        bgColor = BGCOLORS[keyState[keyItem]];
        bgColorHover = BGCOLORS_HOVER[keyState[keyItem]];
        bgColorActive = BGCOLORS_ACTIVE[keyState[keyItem]];
        color = COLORS[keyState[keyItem]];
    }

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
