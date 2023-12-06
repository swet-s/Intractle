import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
});

export const auth = getAuth(app);
export default app;

export const handleSignIn = async () => {
    try {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.log(error);
    }
};

export const handleSignOut = async () => {
    signOut(auth);
};
