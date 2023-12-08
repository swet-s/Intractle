import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../features/themeSlice";
import Switch from "../tools/Switch";
import { FaSun, FaMoon, FaGithub } from "react-icons/fa";

export default function Setting() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const toggleSwitch = () => {
        dispatch(toggleDarkMode());
    };

    const handleContributeClick = () => {
        window.location.href = "https://github.com/swet-s/Intractle";
    };

    return (
        <div className="mb-2 text-center font-mono font-semibold text-lg">
            <div className="flex justify-between space-x-12 mx-2 select-none rounded-md p-2">
                {/* <InformationCircleIcon className="w-8 h-8" /> */}
                <span>Dark Mode</span>
                <Switch switchState={darkMode} onChange={toggleSwitch}>
                    {darkMode ? (
                        <FaMoon className="text-yellow-500" />
                    ) : (
                        <FaSun className="text-yellow-500" />
                    )}
                </Switch>
            </div>

            <hr className="bg-gray-800 h-0.5 w-full my-2" />

            <div
                className={`${darkMode ? "my-large-button-dark" : "my-large-button"}`}
                onClick={handleContributeClick}
            >
                <FaGithub />
                Help Contribute
            </div>
        </div>
    );
}
