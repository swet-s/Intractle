import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
    const loading = useSelector((state) => state.animation.loading);

    return (
        <div>
            {loading && (
                <div className="fixed bg-slate-100 bg-opacity-60 w-full h-full z-50 flex justify-center items-center">
                    <div className="animate-spin border-double rounded-full h-8 w-8  border-x-[3px] border-y-4 border-gray-400 select-none"></div>
                </div>
            )}
        </div>
    );
}
