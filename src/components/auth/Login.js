import React from "react";
import { FaGoogle } from "react-icons/fa";
import { handleSignIn } from "../../auth/firebase";
import { useDispatch } from "react-redux";
import { setPopUpState, setPopUpWindow } from "../../features/popUpSlice";

export default function Login() {
    const dispatch = useDispatch();

    const handleClick = async () => {
        handleSignIn();

        dispatch(setPopUpWindow(false));
        dispatch(setPopUpState(""));
    };

    return (
        <div className="mb-2">
            <div className="text-center font-mono font-semibold text-lg select-none">
                LOGIN TO CONTINUE
            </div>

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-full h-12 px-6 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800 select-none"
            >
                <FaGoogle className="w-6 h-6 mr-4" />
                SignUp/Login with Google
            </button>
        </div>
    );
}
