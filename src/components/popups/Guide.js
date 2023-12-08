import React from "react";

export default function Guide() {
    return (
        <div className="mb-2">
            <div className="pb-2 text-center font-mono font-semibold text-lg">HOW TO PLAY</div>

            <div className="font-serif font-medium text-sm p-4">
                <ol>
                    <li>- Enter a 5-letter word guess into the input field.</li>
                    <li>- Each guess you make must consist of a valid 5-letter word.</li>
                    <li>- Green indicates correct letters in the correct position.</li>
                    <li>- Yellow indicates correct letters but in the wrong position.</li>
                    <li>- Gray means the letter is incorrect.</li>
                    <li>- Attempt to guess the word within a limit of 6 tries.</li>
                    <li>- Guess the correct 5-letter word to win.</li>
                </ol>
            </div>
        </div>
    );
}
