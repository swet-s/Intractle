import React, { useEffect } from "react";
import Cell from "./Cell";
import { ROW, COLUMN } from "../constants/gameConstant";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./tools/Spinner";
import { setKeyFromGuess } from "../features/keySlice";

export default function Board() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.animation.loading);
    const inputList = useSelector((state) => state.board.inputList);
    const guessList = useSelector((state) => state.board.guessList);

    useEffect(() => {
        dispatch(setKeyFromGuess({ inputList, guessList }));
    }, [guessList]);

    return (
        <div className="relative my-10 sm:mt-6 sm:mb-2 flex text-center">
            {loading && <Spinner />}
            <div className={`mx-auto ${loading && "opacity-30"}`}>
                {Array.from({ length: ROW }).map((_, i) => (
                    <div className="flex" key={i}>
                        {Array.from({ length: COLUMN }).map((_, j) => (
                            <Cell key={[i, j]} row={i} col={j} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
