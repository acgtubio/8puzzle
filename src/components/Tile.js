import React from "react";
import { move } from "./SearchUtils";

export default function Tile({ setGameState, gameState, i, type }){
    function updateGameState() {
        const ind = gameState.indexOf(0);
        if (ind == i){
            return;
        }

        if(((Math.floor(i/3) == Math.floor(ind/3)) && (i + 1 == ind || i - 1 == ind)) || (i + 3 == ind || i - 3 == ind)){
            const newState = move(gameState, ind, i)
            setGameState(() => {
                return newState;
            })
        }
        else{
            console.log("illegal move")
        }
        
    }

    return (
        <div className={type} onClick={updateGameState}>
            <h1>{gameState[i]}</h1>
        </div>
    )
}