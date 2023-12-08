import React, { useEffect, useState } from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Key({ keyItem, onKeyPress }) {
    const [colorFade, setColorFade] = useState("");

    const darkMode = useSelector((state) => state.theme.darkMode);
    const keyColors = useSelector((state) => state.key.keyColors);

    const COLORFADE = [
        "",
        darkMode ? "color-fade-gray-dark" : "color-fade-gray",
        darkMode ? "color-fade-yellow-dark" : "color-fade-yellow",
        darkMode ? "color-fade-green-dark" : "color-fade-green",
    ];

    const BGCOLORS = [
        darkMode ? "bg-intractle-default-dark" : "bg-intractle-default",
        "bg-intractle-gray",
        "bg-intractle-yellow",
        "bg-intractle-green",
    ];

    const BGCOLORS_HOVER = [
        darkMode ? "hover:bg-intractle-default-dark-hover" : "hover:bg-intractle-default-hover",
        "hover:bg-intractle-gray-hover",
        "hover:bg-intractle-yellow-hover",
        "hover:bg-intractle-green-hover",
    ];

    const BGCOLORS_ACTIVE = [
        darkMode ? "active:bg-intractle-default-dark-active" : "active:bg-intractle-default-active",
        "active:bg-intractle-gray-active",
        "active:bg-intractle-yellow-active",
        "active:bg-intractle-green-active",
    ];

    const TEXTCOLOR = [
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

    const bgColor = BGCOLORS[keyColors[keyItem]];
    const bgColorHover = BGCOLORS_HOVER[keyColors[keyItem]];
    const bgColorActive = BGCOLORS_ACTIVE[keyColors[keyItem]];
    const color = TEXTCOLOR[keyColors[keyItem]];

    useEffect(() => {
        setColorFade(COLORFADE[keyColors[keyItem]]);
    }, [keyColors]);

    return (
        <button
            className={`mx-0.5 my-0.5 h-11 ${colorFade} ${buttonWidthClass} ${buttonPaddingClass}  ${bgColor} ${bgColorHover} ${bgColorActive} ${color} rounded-md`}
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
