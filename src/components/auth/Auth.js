import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName, setUserPhotoUrl } from "../../features/userSlice";

export default function Auth() {
    const dispatch = useDispatch();
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
        <div className="p-0.5 w-10 h-7 border-white border-[1px] rounded-full select-none flex justify-center items-center">
            {photoUrl ? (
                <>
                    <img src={photoUrl} className="rounded-full w-5 h-5"></img>
                    {/* <div className="text-xs rounded-lg">^</div> */}
                </>
            ) : (
                <div className="text-xs ">Login</div>
            )}
        </div>
    );
}
