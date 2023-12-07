import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { PopUpLogin, PopUpMenu, PopUpUser } from "../features/popUpSlice";
import Auth from "./auth/Auth";

export default function Navbar(props) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);

    const toggleAuth = () => {
        if (userId) dispatch(PopUpUser());
        else dispatch(PopUpLogin());
    };

    return (
        <nav className="h-14 sm:h-12 flex justify-between items-center bg-gray-800 text-white rounded-sm">
            <div className="flex ml-2">
                <Bars3Icon className="my-button" onClick={() => dispatch(PopUpMenu())} />
            </div>
            <header className="text-center absolute w-full pointer-events-none font-serif font-semibold text-xl">
                {props.name}
            </header>
            <span className="flex mr-2 justify-center items-center" onClick={toggleAuth}>
                <Auth />
            </span>
        </nav>
    );
}
