import React from "react";
import Puzzle from "./Puzzle.js";

export default function Solution({gameSolution}) {
    const items = gameSolution.map(x => {
        // return <h6>{x.state} {x.name}</h6>
        return (
            <div className="soln-item">
                <Puzzle gameState={x.state} tileType={"soln-tile"} setGameState={()=>{}}/>
            </div>
        )
    })

    return (
        <>
            {items}
        </>
    )
}