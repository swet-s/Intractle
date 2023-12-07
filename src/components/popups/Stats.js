import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

export default function Stats() {
    const gameStats = {
        attemps: [12, 14, 15, 32, 25, 12, 7],
        currStreak: 3,
        bestStreak: 4,
    };

    function mapToHeight(array) {
        const maxValue = Math.max(...array);

        // Map each value to the range 0-100 and round to the nearest integer
        const mappedArray = array.map((value) => {
            const scaledValue = (value / maxValue) * 100;
            return { value: value, scale: Math.round(scaledValue) };
        });

        return mappedArray;
    }

    const calcSum = (array) => {
        return array.reduce((sum, current) => sum + current, 0);
    };

    return (
        <div>
            <div className="text-center font-mono font-semibold text-lg">STATS</div>
            <div className="sm:flex items-center space-x-5 mx-10">
                <div className="font-mono font-semibold text-sm">
                    <div>{`Game Played: ${calcSum(gameStats.attemps)}`}</div>
                    <div>{`Won: ${calcSum(gameStats.attemps) - gameStats.attemps[0]}`}</div>
                    <div>{`Current Streak: ${gameStats.currStreak}`} </div>
                    <div>{`Best Streak: ${gameStats.bestStreak}`} </div>
                </div>
                <div className="flex justify-center p-6">
                    <div className=" w-fit flex items-end space-x-3 select-none">
                        {mapToHeight(gameStats.attemps).map((attemp, index) => (
                            <div className="flex flex-col items-center">
                                <text className="py-1 transform -rotate-90 text-xs font-mono font-semibold text-gray-500">
                                    {attemp.value}
                                </text>
                                <div
                                    key={index}
                                    className={`${index === 0 ? "bg-red-500" : "bg-gray-500"}`}
                                    style={{ height: attemp.scale, width: 16 }}
                                ></div>
                                <span className="text-center font-semibold text-[10px]">
                                    {index === 0 ? "Lost" : index}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
