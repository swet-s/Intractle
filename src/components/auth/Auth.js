import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName, setUserPhotoUrl } from "../../features/userSlice";

export default function Auth() {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.userName);
    const photoUrl = useSelector((state) => state.user.photoUrl);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser != null) {
                dispatch(setUserId(currentUser.email));
                dispatch(setUserName(currentUser.displayName));
                dispatch(setUserPhotoUrl(currentUser.photoURL));
            } else {
                dispatch(setUserId(null));
                dispatch(setUserName(null));
                dispatch(setUserPhotoUrl(null));
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {photoUrl ? (
                <div className="flex items-center select-none p-1 border-[1px] rounded-full">
                    <img src={photoUrl} className="rounded-full w-7 h-7"></img>
                    <div className="hidden lg:inline px-2 text-xs rounded-lg truncate max-w-[70px] sm:max-w-[100px]">
                        {userName}
                    </div>
                    <div className="lg:hidden px-2 text-xs rounded-lg truncate max-w-[70px] sm:max-w-[100px]">
                        {userName.split(" ")[0]}
                    </div>
                </div>
            ) : (
                <div className="h-7 flex items-center text-xs px-2 select-none p-1 border-[1px] rounded-full">
                    Login
                </div>
            )}
        </>
    );
}
