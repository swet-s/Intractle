import { useDispatch } from "react-redux";
import { getCurrWord, getGame } from "../api/game";
import { setGameStatus, setGameWord, setGuessList, setInputList } from "../features/boardSlice";
import { useEffect, useState } from "react";

const PullData = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGame("swet123").then((res) => {
            // Found the game with userId
            if (res.status === 1) {
                const gameData = res.gameData;
                dispatch(setInputList([...gameData.wordList, ""]));
                dispatch(setGuessList(gameData.guessList));
                dispatch(setGameStatus(gameData.gameStatus));
            }
        });

        getCurrWord().then((res) => {
            // todo check is word is valid or not
            dispatch(setGameWord(res.word));
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading && (
                <div className="fixed w-full h-full z-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            )}
        </>
    );
};

export default PullData;
