import React from "react";
import { useSelector } from "react-redux";

export default function Lost() {
    const currWord = useSelector((state) => state.board.gameWord);

    return (
        <div className="mb-2 text-center font-mono font-semibold text-lg">
            <div>BETTER LUCK NEXT TIME!</div>
            <div>{`The word is ${currWord}`}</div>
        </div>
    );
}
