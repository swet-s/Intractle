import React, { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import gameContext from "../context/gameContext";

export default function PopUpWindow() {
  const { popUpWindow, togglePopUpWindow } = useContext(gameContext);

  return (
    popUpWindow && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
        <div className="mt-24 sm:mt-0  w-full h-full sm:w-8/12 sm:h-4/5 sm:rounded-lg bg-green-50 shadow-lg">
          <div className="flex justify-end mx-0.5 my-0.5">
            <XMarkIcon
              className="my-button font-extralight"
              onClick={togglePopUpWindow}
            />
          </div>
          <hr />
          <ul>
            <li>Hello</li>
            <hr />
            <li>Welcome</li>
            <hr />
            <li>Namaste</li>
            <hr />
            <li>Bye Bye</li>
            <hr />
          </ul>
        </div>
      </div>
    )
  );
}
