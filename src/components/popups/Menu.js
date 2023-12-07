import React from "react";
import { ChartBarIcon, CogIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { PopUpGuide, PopUpSetting, PopUpStats } from "../../features/popUpSlice";

export default function Menu() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className="mb-2 text-center font-mono font-semibold text-lg">
            <div
                className={`${darkMode ? "my-large-button-dark" : "my-large-button"}`}
                onClick={() => dispatch(PopUpGuide())}
            >
                <InformationCircleIcon className="w-8 h-8" />
                <span>How to Play</span>
            </div>

            <hr className="bg-gray-800 h-0.5 w-full my-2" />

            <div
                className={`${darkMode ? "my-large-button-dark" : "my-large-button"}`}
                onClick={() => dispatch(PopUpStats())}
            >
                <ChartBarIcon className="w-8 h-8" />
                Stats
            </div>

            <hr className="bg-gray-800 h-0.5 w-full my-2" />

            <div
                className={`${darkMode ? "my-large-button-dark" : "my-large-button"}`}
                onClick={() => dispatch(PopUpSetting())}
            >
                <CogIcon className="w-8 h-8" />
                Setting
            </div>
        </div>
    );
}
