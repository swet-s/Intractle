import React from "react";
export default function Switch({ switchState, onChange, children }) {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={switchState}
                    onChange={onChange}
                    className="hidden"
                />
                <div className="w-8 h-4 bg-gray-400 dark:bg-gray-700 rounded-full shadow-inner"></div>
                <div
                    className={`absolute w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow inset-y-0 left-0 ${
                        switchState ? "translate-x-full" : "translate-x-0"
                    }`}
                ></div>
            </div>
            <div className="ml-2"> {children}</div>
        </label>
    );
}
