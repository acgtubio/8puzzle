import { getMoves } from "./SearchUtils";
import { Node } from "./SearchUtils";

export default function BFS({n, queue, visited, setGameProgress, setGameSolution}) {

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
            
            return 1;
        }
        if (!queue.find(e => e.state == move.newState.toString())) {

            const next = new Node(move.newState.toString(), n,   move.name);

            queue.push(next);
        }
    }
    console.log(queue);
    return 0;
}