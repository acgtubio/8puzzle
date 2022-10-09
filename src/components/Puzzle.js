import React from "react";
import Tile from "./Tile";

export default function Puzzle({setGameState, gameState, tileType}) {
    return (
        <>
            <Tile setGameState={setGameState} gameState={gameState} i={0} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={1} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={2} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={3} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={4} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={5} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={6} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={7} type={tileType}/>
            <Tile setGameState={setGameState} gameState={gameState} i={8} type={tileType}/>
        </>
    )
}