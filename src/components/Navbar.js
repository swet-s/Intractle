import {
    Bars3Icon,
    ChartBarIcon,
    CogIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { togglePopUpWindow, setPopUpState } from "../features/popUpSlice";
import Auth from "./auth/Auth";

export default function Navbar(props) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);

    const toggleMenu = () => {
        dispatch(setPopUpState("MENU"));
        dispatch(togglePopUpWindow());
    };

    const toggleGuide = () => {
        dispatch(setPopUpState("GUIDE"));
        dispatch(togglePopUpWindow());
    };

    const toggleStats = () => {
        dispatch(setPopUpState("STATS"));
        dispatch(togglePopUpWindow());
    };

    const toggleSetting = () => {
        dispatch(setPopUpState("SETTING"));
        dispatch(togglePopUpWindow());
    };

    const toggleAuth = () => {
        if (userId) dispatch(setPopUpState("USER"));
        else dispatch(setPopUpState("LOGIN"));
        dispatch(togglePopUpWindow());
    };

    return (
        <nav className="h-14 sm:h-12 relative flex justify-between items-center bg-gray-800 text-white mb-0.5 py-2 rounded-sm">
            <div className="flex ml-2 mr-14 space-x-1">
                <Bars3Icon className="my-button" onClick={toggleMenu} />
            </div>
            <header className="text-center absolute w-full pointer-events-none font-serif font-semibold text-xl">
                {props.name}
            </header>
            <div className="flex mx-5 space-x-1">
                <InformationCircleIcon className="my-button" onClick={toggleGuide} />
                <ChartBarIcon className="my-button" onClick={toggleStats} />
                <CogIcon className="my-button" onClick={toggleSetting} />
                <div className="my-button" onClick={toggleAuth}>
                    <Auth />
                </div>
            </div>
        </nav>
    );
}
