import React from "react";
import Cell from "./Cell";
import { ROW, COLUMN } from "../constants/gameConstant";

export default function Board() {
    return (
        <div className="my-10 sm:mt-6 sm:mb-2 flex text-center">
            <div className="mx-auto">
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
