import React from "react";
import { FaGoogle } from "react-icons/fa";
import { handleSignIn, handleSignOut } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { ClosePopUp } from "../../features/popUpSlice";
export default function User() {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.userName);

    const handleClick = async () => {
        handleSignOut();
        dispatch(ClosePopUp());
    };

    return (
        <div className="mb-2">
            <div className="text-center font-mono font-semibold text-lg">HELLO {userName}</div>

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-full h-12 px-6 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800"
            >
                <FaGoogle className="w-6 h-6 mr-4" />
                Click to LogOut
            </button>
        </div>
    );
}
