export class Node {
    constructor(state, parent, move) {
        this.state = state;
        this.parent = parent;
        this.move = move;
    }
}

export class AstarNode extends Node {
    constructor(state, parent, move, h, n){
        super(state, parent, move)
        this.h = h
        this.moveN = n
    }
}

export class PriorityQueue {
    constructor(){
        this.queue = []; //array of a-star nodes
    }

    compare(a,b){
        return this.queue[a].h > this.queue[b].h
    }

    insert(n){
        this.queue.push(n);
        this.siftUp();
    }

    shift(){
        const node = this.queue[0];
        const l = this.queue.length - 1;

        if(l > 0){
            [this.queue[0], this.queue[l]] = [this.queue[l], this.queue[0]];
        }

        this.queue.pop();
        this.siftDown();

        return node;
    }

    parentOf(n) {
        return ((n+1) >>> 1) -1;
    }

    siftUp(){
        let node = this.queue.length - 1

        while (node > 0 && this.compare(node, this.parentOf(node))){
            [this.queue[node], this.queue[this.parentOf(node)]] = [this.queue[this.parentOf(node)], this.queue[node]];
            node = this.parentOf(node);
        }
    }

    siftDown(){
        let node = 0;
        let left = 1;
        let right = 2;

        while((left < this.queue.length && this.compare(left, node)) || (right < this.queue.length && this.compare(right, node))){
            let d = this.compare(left, right) ? left : right;
            [this.queue[node], this.queue[d]] = [this.queue[d], this.queue[node]];
            node = d
            left = 2 * d + 1;
            right =  2 * d + 2;
        }
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



