import React, { useState } from "react";
import Puzzle from "./Puzzle.js";
import { getMoves, Node } from "./SearchUtils.js";

export default function Game({gameState, setGameState, setGameProgress, setGameSolution, gameSolution}){

    let secBtn = <div className="button btn-ngame" onClick={ 
        () => {
            setGameProgress(true);
            const queue = []; 
            const visited = new Set();
            
            const first = new Node(gameState.toString(), null, null);
            queue.push(first);

            solve(queue, visited);
        }}
        ><span>SOLVE</span></div>

    if(gameSolution.length > 0) {
        secBtn = <div className="button btn-ngame" onClick={
            () => {
                const solSteps = [...gameSolution];
                animate(solSteps);
            }
        }><span>Show Solution</span></div>
    }

    function animate(solution){
        if (solution.length == 0){
            return;
        }
        const step = solution.shift();

        setGameState(step.state);

        setTimeout(() => {
            animate(solution)
        }, 500)
    }

    function solve(queue, visited){
        const n = queue.shift();
        visited.add(n.state);
        
        const nextMoves = getMoves(n.state.split(',').map( x => parseInt(x))).filter( x => !visited.has(x.newState.toString()));

        for (const move of nextMoves) {
            const moveState = move.newState.toString()
            if (moveState == "0,1,2,3,4,5,6,7,8") {
                var sol = [];
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
                sol = sol.map(x => {
                    return { ...x, state: x.state.split(',').map( y => parseInt(y))}
                });
                
                setGameProgress(false);
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

    function shuffle(){
        const nMoves = 30;
        let state = [0,1,2,3,4,5,6,7,8];
        
        for(let i=0; i<nMoves; i++){
            let moves = getMoves(state);

            state = moves[Math.floor(Math.random()*moves.length)].newState;
        }

        setGameState([...state]);
        setGameSolution([]);
    }

    return (
        <> 
            <div className="game">
                <Puzzle setGameState={setGameState} gameState={gameState} tileType={"tile"} clickable={ gameSolution.length == 0 }/>
            </div>

            <div className="controls">
                <div className="button btn-solve" onClick={ shuffle }><span>SHUFFLE</span></div>
                {secBtn}
            </div>
        </>
    )
}