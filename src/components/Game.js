import React, { useState } from "react";
import Puzzle from "./Puzzle.js";
import { getMoves, Node } from "./SearchUtils.js";

export default function Game({gameSolution, setGameSolution}){
    const [gameState, setGameState] = useState([4,6,0,8,5,2,7,1,3]);
    
    // const [gameState, setGameState] = useState([1,2,5,3,4,0,6,7,8]);
    // const [gameState, setGameState] = useState([2,4,8,7,0,1,5,6,3]);
    // const [gameState, setGameState] = useState([1,2,5,3,4,0,6,7,8]);

    function solve(queue, visited){
        const n = queue.shift();
        visited.add(n.state);
        
        const nextMoves = getMoves(n.state.split(',').map( x => parseInt(x))).filter( x => !visited.has(x.newState.toString()));

        for (const move of nextMoves) {
            const moveState = move.newState.toString()
            if (moveState == "0,1,2,3,4,5,6,7,8") {
                const sol = [];
                sol.push({
                    state: moveState,
                    name: move.name
                });

                var curr = n;
                while(curr != null) {
                    sol.push({
                        state: curr.state,
                        name: curr.move
                    });
                    curr = curr.parent
                }
                console.log(sol);
                // console.log(`done. nodes visited: ${i}`);

                setGameSolution(sol.reverse());
                
                return;
            }
            if (!queue.find(e => e.state == move.newState.toString())) {

                const next = new Node(move.newState.toString(), n,   move.name);

                queue.push(next);
            }
        }

        setTimeout(() => {
            solve(queue, visited);
        }, 0); 
    }

    return (
        <> 
            <div className="game">
                <Puzzle setGameState={setGameState} gameState={gameState} tileType={"tile"}/>
            </div>

            <div className="controls">
                <div className="button btn-ngame"><span>SHUFFLE</span></div>
                <div className="button btn-solve" onClick={ 
                    () => {
                        const queue = []; 
                        const visited = new Set();
                        
                        const first = new Node(gameState.toString(), null, null);
                        queue.push(first);

                        solve(queue, visited);
                    }}
                    ><span>SOLVE</span></div>
            </div>
        </>
    )
}