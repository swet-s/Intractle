import React, { useContext } from "react";
import {
  Bars3Icon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import gameContext from "../context/gameContext";

export default function Navbar(props) {
  const { togglePopUpWindow } = useContext(gameContext);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white mb-0.5 py-2 rounded-sm">
      <div className="flex ml-2 mr-14 space-x-1">
        <Bars3Icon className="my-button" onClick={togglePopUpWindow} />
      </div>
      <header className="text-center font-serif font-semibold text-xl">
        {props.name}
      </header>
      <div className="flex mx-2 space-x-1">
        <InformationCircleIcon className="my-button" />
        <ChartBarIcon className="my-button" />
        <CogIcon className="my-button" />
      </div>
    </nav>
  );
}
