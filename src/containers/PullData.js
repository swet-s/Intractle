import { useDispatch, useSelector } from "react-redux";
import { getCurrWord, getGame } from "../api/game";
import {
    resetGame,
    setGameStatus,
    setGameWord,
    setGuessList,
    setInputList,
} from "../features/boardSlice";
import { useEffect, useState } from "react";
import { setLoading } from "../features/animationSlice";
import { ClosePopUp, PopUpLogin } from "../features/popUpSlice";

const PullData = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);

    const [pullWordStatus, setPullWordStatus] = useState(false);
    const [pullGameStatus, setPullGameStatus] = useState(false);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(resetGame());
        if (userId == null) {
            dispatch(PopUpLogin());
        } else {
            dispatch(ClosePopUp());

            setPullGameStatus(false);
            getGame(userId).then((res) => {
                // Found the game with userId
                if (res.status === 1) {
                    const gameData = res.data;
                    dispatch(setInputList([...gameData.wordList, ""]));
                    dispatch(setGuessList(gameData.guessList));
                    dispatch(setGameStatus(gameData.gameStatus));
                }

                setPullGameStatus(true);
            });
        }
    }, [userId]);

    useEffect(() => {
        getCurrWord().then((res) => {
            dispatch(setGameWord(res.word));
            setPullWordStatus(true);
        });
    }, []);

    useEffect(() => {
        if (pullGameStatus && pullWordStatus) dispatch(setLoading(false));
        else dispatch(setLoading(true));
    }, [pullGameStatus, pullWordStatus]);

    return null;
};

export default PullData;
