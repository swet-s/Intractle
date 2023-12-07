import React, { useEffect } from "react";
import { ArrowLeftCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Guide from "./popups/Guide";
import { useDispatch, useSelector } from "react-redux";
import Login from "./auth/Login";
import User from "./auth/User";
import Lost from "./popups/Lost";
import Win from "./popups/Win";
import Menu from "./popups/Menu";
import Stats from "./popups/Stats";
import Setting from "./popups/Setting";
import { ClosePopUp, PopUpLost, PopUpMenu, PopUpWon } from "../features/popUpSlice";

export default function PopUpWindow() {
    const dispatch = useDispatch();

    const isPopUpWindowOpen = useSelector((state) => state.popUp.isPopUpWindowOpen);
    const popUpState = useSelector((state) => state.popUp.popUpState);
    const gameStatus = useSelector((state) => state.board.gameStatus);
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        if (gameStatus === "WON") {
            dispatch(PopUpWon());
        } else if (gameStatus === "LOST") {
            dispatch(PopUpLost());
        }
    }, [gameStatus]);

    const handleBack = () => {
        if (popUpState === "MENU") dispatch(ClosePopUp());
        else dispatch(PopUpMenu());
    };

    return (
        isPopUpWindowOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-40">
                <div
                    className={`mt-72 sm:mt-0  w-full h-full sm:w-auto sm:h-auto sm:rounded-lg ${
                        darkMode ? "bg-black text-gray-100 bg-opacity-75" : "bg-white bg-opacity-30"
                    } shadow-lg px-2 py-1 backdrop-blur-sm `}
                >
                    <div className="flex flex-row-reverse justify-between">
                        <XMarkIcon
                            className="my-button font-extralight"
                            onClick={() => dispatch(ClosePopUp())}
                        />

                        {(popUpState === "GUIDE" ||
                            popUpState === "STATS" ||
                            popUpState === "SETTING") && (
                            <ArrowLeftCircleIcon
                                className="my-button font-extralight"
                                onClick={handleBack}
                            />
                        )}
                    </div>
                    <hr className="bg-black h-0.5 w-full my-2" />

                    {popUpState === "MENU" ? (
                        <Menu />
                    ) : popUpState === "LOGIN" ? (
                        <Login />
                    ) : popUpState === "USER" ? (
                        <User />
                    ) : popUpState === "WON" ? (
                        <Win />
                    ) : popUpState === "LOST" ? (
                        <Lost />
                    ) : popUpState === "GUIDE" ? (
                        <Guide />
                    ) : popUpState === "STATS" ? (
                        <Stats />
                    ) : popUpState === "SETTING" ? (
                        <Setting />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    );
}
