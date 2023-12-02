import React, { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import gameContext from "../context/gameContext";
import Guide from "./Guide";
import { useDispatch, useSelector } from "react-redux";
import { togglePopUpWindow } from "../features/popUpSlice";

export default function PopUpWindow() {
    const dispatch = useDispatch();
    const { currWord, guessList } = useContext(gameContext);

    const isPopUpWindowOpen = useSelector((state) => state.popUp.isPopUpWindowOpen);
    const popUpState = useSelector((state) => state.popUp.popUpState);

    return (
        isPopUpWindowOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-40">
                <div className="mt-72 sm:mt-0  w-full h-full sm:w-auto sm:h-auto sm:rounded-lg bg-white bg-opacity-75 shadow-lg px-2 py-1 backdrop-blur">
                    <div className="flex justify-end">
                        <XMarkIcon
                            className="my-button font-extralight"
                            onClick={() => dispatch(togglePopUpWindow())}
                        />
                    </div>
                    <hr className="bg-black h-0.5 w-full my-2" />

                    {popUpState === "GUIDE" ? (
                        <Guide></Guide>
                    ) : popUpState === "WON" ? (
                        <div className="mb-2 text-center font-mono font-semibold text-lg">
                            <div>CONGRATULATIONS!</div>
                            <div>{`You guessed the word in ${guessList.length} attempt${
                                guessList.length === 1 ? "" : "s"
                            }.`}</div>
                        </div>
                    ) : popUpState === "LOST" ? (
                        <div className="mb-2 text-center font-mono font-semibold text-lg">
                            <div>BETTER LUCK NEXT TIME!</div>
                            <div>{`The word is ${currWord}`}</div>
                        </div>
                    ) : popUpState === "STATS" ? (
                        <div className="mb-2 text-center font-mono font-semibold text-lg">
                            <div>{`Game Played: 10`}</div>
                            <div>{`Won: 4`}</div>
                            <div>{`Win%: 40`}</div>
                        </div>
                    ) : popUpState === "SETTING" ? (
                        <>
                            <header className="font-mono font-semibold text-xl">DARK MODE</header>
                            <hr className="bg-black h-0.5 w-full my-2" />
                            <header className="font-mono font-semibold text-xl">DIFFICULTY</header>
                            <hr className="bg-black h-0.5 w-full my-2" />
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    );
}
