import React from "react";
import { useSelector } from "react-redux";

export default function Win() {
    const guessList = useSelector((state) => state.board.guessList);

    return (
        <div className="mb-2 text-center font-mono font-semibold text-lg">
            <div>CONGRATULATIONS!</div>
            <div>{`You guessed the word in ${guessList.length} attempt${
                guessList.length === 1 ? "" : "s"
            }.`}</div>
        </div>
    );
}
