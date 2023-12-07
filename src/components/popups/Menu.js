import React from "react";
import { ChartBarIcon, CogIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { PopUpGuide, PopUpSetting, PopUpStats } from "../../features/popUpSlice";

export default function Menu() {
    const dispatch = useDispatch();

    return (
        <div className="mb-2 text-center font-mono font-semibold text-lg">
            <div className="my-large-button" onClick={() => dispatch(PopUpGuide())}>
                <InformationCircleIcon className="w-8 h-8" />
                <spna>How to Play</spna>
            </div>

            <hr className="bg-gray-800 h-0.5 w-full my-2" />

            <div className="my-large-button" onClick={() => dispatch(PopUpStats())}>
                <ChartBarIcon className="w-8 h-8" />
                Stats
            </div>

            <hr className="bg-gray-800 h-0.5 w-full my-2" />

            <div className="my-large-button" onClick={() => dispatch(PopUpSetting())}>
                <CogIcon className="w-8 h-8" />
                Setting
            </div>
        </div>
    );
}
