import React, { useContext } from "react";
import {
  Bars3Icon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import gameContext from "../context/gameContext";

export default function Navbar(props) {
  const { togglePopUpWindow, setPopUpState } = useContext(gameContext);

  const toggleMenu = () => {
    setPopUpState("MENU");
    togglePopUpWindow();
  };

  const toggleGuide = () => {
    setPopUpState("GUIDE");
    togglePopUpWindow();
  };

  const toggleStats = () => {
    setPopUpState("STATS");
    togglePopUpWindow();
  };

  const toggleSetting = () => {
    setPopUpState("SETTING");
    togglePopUpWindow();
  };
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white mb-0.5 py-2 rounded-sm">
      <div className="flex ml-2 mr-14 space-x-1">
        <Bars3Icon className="my-button" onClick={toggleMenu} />
      </div>
      <header className="text-center font-serif font-semibold text-xl">
        {props.name}
      </header>
      <div className="flex mx-2 space-x-1">
        <InformationCircleIcon className="my-button" onClick={toggleGuide} />
        <ChartBarIcon className="my-button" onClick={toggleStats} />
        <CogIcon className="my-button" onClick={toggleSetting} />
      </div>
    </nav>
  );
}
