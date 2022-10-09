export class Node {
    constructor(state, parent, move) {
        this.state = state;
        this.parent = parent;
        this.move = move;
    }
}

export function move(gameState, z, n) {
    const newState = [...gameState];
    newState[z] = gameState[n];
    newState[n] = gameState[z];

    return [...newState]
}

export function getMoves(gameState){
    const moves = [];
    const zeroInd = gameState.indexOf(0);
    const right = new Set([2,5,8]);
    const left = new Set([0,3,6]);
    const up = new Set([0,1,2]);
    const down = new Set([6,7,8]);

    if (!right.has(zeroInd)) {
        moves.push({
            newState: move(gameState, zeroInd, zeroInd + 1),
            i: zeroInd + 1,
            name: "right"
        });
    }
    if (!down.has(zeroInd)) {
        moves.push({
            newState: move(gameState, zeroInd, zeroInd + 3),
            i: zeroInd + 3,
            name: "down"
        });
    }
    if (!left.has(zeroInd)) {
        moves.push({
            newState: move(gameState, zeroInd, zeroInd - 1),
            i: zeroInd - 1,
            name: "left"
        });
    }
    if (!up.has(zeroInd)) {
        moves.push({
            newState: move(gameState, zeroInd, zeroInd - 3),
            i: zeroInd - 3,
            name: "up"
        });
    }

    return [...moves];
    // console.log(moves);
}



