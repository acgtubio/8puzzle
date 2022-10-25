import { getMoves } from "./SearchUtils";
import { AstarNode } from "./SearchUtils";

function heuristic(state){
    const target = [0,1,2,3,4,5,6,7,8];
    let h = 0;

    for(let x = 0; x<state.length; x++){
        if(target[x] != state[x]) {
            h++;
        }
    }
    return h;
}

export default function Astar({n, queue, visited, setGameProgress, setGameSolution}){
    if(n.state == '0,1,2,3,4,5,6,7,8'){
        var sol = [];

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

    visited.push(n);

    const moves = getMoves(n.state.split(',').map( x => parseInt(x)));
    // console.log(moves)

    for(const move of moves){
        const h = heuristic(move.newState) + n.moveN + 1;
        const moveState = move.newState.toString();

        const newNode = new AstarNode(moveState, n, move.name, h, n.moveN + 1);

        const nodeInClosed = visited.findIndex(e => e.state == move.newState.toString());
        const nodeInOpen = queue.findIndex(e => e.state == move.newState.toString());

        if (nodeInClosed != -1){
            continue;
        }
        else if(nodeInOpen != -1 && newNode.h < queue[nodeInOpen].h){
            queue[nodeInOpen].h = newNode;
        }
        else{
            queue.push(newNode);
        }
    }

    queue.sort(function(a,b) {
        return a.h-b.h;
    })

    console.log([...queue]);
    return 0;
}