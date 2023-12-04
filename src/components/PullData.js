import { useDispatch, useSelector } from "react-redux";
import { getCurrWord, getGame } from "../api/game";
import { setGameStatus, setGameWord, setGuessList, setInputList } from "../features/boardSlice";
import { useEffect } from "react";
import { stopLoading } from "../features/animationSlice";

const PullData = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const loading = useSelector((state) => state.animation.loading);

    useEffect(() => {
        getGame(userId).then((res) => {
            // Found the game with userId
            if (res.status === 1) {
                const gameData = res.data;
                dispatch(setInputList([...gameData.wordList, ""]));
                dispatch(setGuessList(gameData.guessList));
                dispatch(setGameStatus(gameData.gameStatus));
            } else {
                // todo something
            }
        });

        getCurrWord().then((res) => {
            // todo check is word is valid or not
            dispatch(setGameWord(res.word));
            dispatch(stopLoading());
        });
    }, []);

    return (
        <>
            {loading && (
                <div className="fixed bg-slate-100 bg-opacity-75  w-full h-full z-50 flex justify-center items-center">
                    <div className="animate-spin border-dashed rounded-full h-16 w-16  border-4 border-gray-500"></div>
                </div>
            )}
        </>
    );
};

export default PullData;
