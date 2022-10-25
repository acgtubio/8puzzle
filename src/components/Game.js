import React, { useState } from "react";
import Puzzle from "./Puzzle.js";
import { getMoves, Node, AstarNode, PriorityQueue } from "./SearchUtils.js";
import BFS from "./BreadthFirst.js";
import Astar from "./A-star.js";

export default function Game({gameState, setGameState, setGameProgress, setGameSolution, gameSolution}){

    let secBtn = <div className="button btn-ngame" onClick={ 
        () => {
            setGameProgress(true);
            const queue = []; 
            const visited = new Set();
            
            const first = new Node(gameState.toString(), null, null);
            queue.push(first);

            solve({
                queue: queue, 
                visited: visited,
                searchType: 0,
            });
        }}
        ><span>BFS SOLVE</span></div>

    let starBtn = <div className="button btn-ngame" onClick={
        () => {
            setGameProgress(true);
            // const queue = new PriorityQueue();
            const queue = [];
            const visited = [];
            
            const first = new AstarNode(gameState.toString(), null, null, 0, 0);
            // queue.insert(first);
            queue.push(first);

            solve({
                queue: queue, 
                visited: visited,
                searchType: 1,
            });

        }
    }>
        <span>A* SOLVE</span>
    </div>

    let solBtn = <div className="button btn-ngame" onClick={
        () => {
            const solSteps = [...gameSolution];
            animate(solSteps);
        }
    }><span>SHOW SOLUTION</span></div> 
    
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

    function solve({queue, visited, searchType}){
        const n = queue.shift();

        // if BFS
        if(searchType==0){
            var res = BFS({
                n: n,
                queue: queue,
                visited: visited,
                setGameProgress: setGameProgress,
                setGameSolution: setGameSolution
            });
            if(res==1){
                return;
            }
        }
        else if(searchType == 1){
            var res = Astar({
                n: n,
                queue: queue,
                visited: visited,
                setGameProgress: setGameProgress,
                setGameSolution: setGameSolution
            })
            if(res == 1){
                return;
            }
        }
        

        setTimeout(() => {
            solve({
                queue: queue, 
                visited: visited,
                searchType: searchType,
            });
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
            </div>
            <div className="controls">
                {secBtn}
                {starBtn}
            </div>
            <div className="controls">
                {gameSolution.length > 0 ? solBtn : <></>}
            </div>
        </>
    )
}