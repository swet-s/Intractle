import React from "react";

export default function Guide() {
    return (
        <div className="mb-2">
            <div className="text-center font-mono font-semibold text-lg">HOW TO PLAY</div>
            <ul className="font-serif font-medium text-sm">
                <li> - Attempt to guess the Wordle within a limit of 6 tries.</li>
                <li>- Each guess you make must consist of a valid 5-letter word.</li>
                <li>- Tiles change color for closeness.</li>
            </ul>
        </div>
    );
}
