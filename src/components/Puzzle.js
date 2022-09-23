import React, { useState } from "react";
import Tile from "./Tile.js"

export default function Puzzle(){
    const [gameState, setGameState] = useState([0,1,2,3,4,5,6,7,8]);

    // solve using BFS
    function solvePuzzle(){
        // something something something
    }

    return (
        <>
            <div className="game">
                <Tile setGameState={setGameState} gameState={gameState} i={0}/>
                <Tile setGameState={setGameState} gameState={gameState} i={1}/>
                <Tile setGameState={setGameState} gameState={gameState} i={2}/>
                <Tile setGameState={setGameState} gameState={gameState} i={3}/>
                <Tile setGameState={setGameState} gameState={gameState} i={4}/>
                <Tile setGameState={setGameState} gameState={gameState} i={5}/>
                <Tile setGameState={setGameState} gameState={gameState} i={6}/>
                <Tile setGameState={setGameState} gameState={gameState} i={7}/>
                <Tile setGameState={setGameState} gameState={gameState} i={8}/>
            </div>

            <div className="controls">
                <div className="button btn-ngame" onClick={solvePuzzle}><span>SHUFFLE</span></div>
                <div className="button btn-solve"><span>SOLVE</span></div>
            </div>
        </>
    )
}