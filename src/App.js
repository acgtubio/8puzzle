import {React, useState} from "react";
import Game from "./components/Game.js"
import Solution from "./components/Solution.js";

export default function App() {
  const [gameSolution, setGameSolution] = useState([]);
  const [gameProgress, setGameProgress] = useState(false);
  const [gameState, setGameState] = useState([0,1,2,3,4,5,6,7,8]);
  // const [gameState, setGameState] = useState([4,6,0,8,5,2,7,1,3]);
  // const [gameState, setGameState] = useState([1,2,5,3,4,0,6,7,8]);
  // const [gameState, setGameState] = useState([2,4,8,7,0,1,5,6,3]);

  const gameDisplay = !gameProgress ? <Game gameState={gameState} setGameState={setGameState} gameSolution={gameSolution} setGameSolution={setGameSolution} setGameProgress={setGameProgress}/> : <img src="https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif"/>

  return (
    <>
      <div className="row content">
        <div className="col">
          {gameDisplay}
        </div>

        <div className="col">
          <div className="soln">
            <Solution gameSolution={gameSolution}/>
          </div>
        </div>
      </div>
    </>
  )
}