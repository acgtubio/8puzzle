import {React, useState} from "react";
import Game from "./components/Game.js"
import Puzzle from "./components/Puzzle.js";

export default function App() {

  const [gameSolution, setGameSolution] = useState([]);

  return (
    <div className="row">
      <div className="col">
        <Game/>
      </div>

      <div className="col">
        <div className="soln-item">
          <Puzzle gameState={gameSolution} tileType={"soln-tile"}/>
        </div>
      </div>
    </div>
  )
}