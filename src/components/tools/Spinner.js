import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Spinner() {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaSpinner
                className={`w-8 h-8 animate-spin opacity-50  ${
                    darkMode ? "text-slate-200" : "text-slate-800"
                } select-none`}
            ></FaSpinner>
        </div>
    );
}
