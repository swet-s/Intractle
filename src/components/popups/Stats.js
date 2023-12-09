import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/game";
import { useSelector } from "react-redux";

export default function Stats() {
    const userId = useSelector((state) => state.user.userId);

    const [gameStats, SetGameStats] = useState({
        attempts: [12, 14, 15, 32, 25, 12, 7],
        currentStreak: 3,
        bestStreak: 4,
    });

    useEffect(() => {
        const getUserStats = async () => {
            const response = await getUser(userId);
            if (response.status === 1) {
                SetGameStats(response.data);
            }
        };

        getUserStats();
    }, []);

    useEffect(() => {
        getUser(userId);
    }, []);

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
            <div className="pb-2 text-center font-mono font-semibold text-lg">STATS</div>
            <div className="sm:flex items-center sm:space-x-3 mx-10">
                <div className="flex justify-center p-4 border-[1px] rounded-sm my-4 sm:mb-8">
                    <div className=" w-fit flex items-end space-x-3 select-none">
                        {mapToHeight(gameStats.attempts).map((attemp, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className="py-1 transform -rotate-90 text-xs font-mono font-semibold text-gray-500">
                                    {attemp.value}
                                </span>
                                <div
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
                <div className="font-mono font-semibold text-sm p-4 border-[0  px] rounded-sm my-4">
                    <div>{`Game Played: ${calcSum(gameStats.attempts)}`}</div>
                    <div>{`Won: ${calcSum(gameStats.attempts) - gameStats.attempts[0]}`}</div>
                    <div>{`Current Streak: ${gameStats.currentStreak}`} </div>
                    <div>{`Best Streak: ${gameStats.bestStreak}`} </div>
                </div>
            </div>
        </div>
    );
}
