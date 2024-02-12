const b0 = document.getElementById('0');
const b1 = document.getElementById('1');
const b2 = document.getElementById('2');
const b3 = document.getElementById('3');
const b4 = document.getElementById('4');
const b5 = document.getElementById('5');
const b6 = document.getElementById('6');
const b7 = document.getElementById('7');
const b8 = document.getElementById('8');

const reset = document.getElementById("reset-button");
const resultText =  document.getElementById("result-text");

const Victory = {
    PlayerX: 0,
    ComputerO: 1,
    Draw: 2
};

let current = 'X';
let gameOver = false;
let board = new Array(9).fill('');
let player_turn = true;

function nextTurn(current) {
    return current === 'X' ? 'O' : 'X';
}

function check(board, current) {
    if (
        (board[0] === board[1] && board[1] === board[2] && board[0] !== '') || 
        (board[3] === board[4] && board[4] === board[5] && board[3] !== '') || 
        (board[6] === board[7] && board[7] === board[8] && board[6] !== '') || 
        (board[0] === board[3] && board[3] === board[6] && board[0] !== '') || 
        (board[1] === board[4] && board[4] === board[7] && board[1] !== '') || 
        (board[2] === board[5] && board[5] === board[8] && board[2] !== '') || 
        (board[0] === board[4] && board[4] === board[8] && board[0] !== '') || 
        (board[2] === board[4] && board[4] === board[6] && board[2] !== '')
    ) {
        if (current === 'X'){
            return Victory.PlayerX;
        } else {
            return Victory.ComputerO;
        }
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
        return false;
        }
    }
    return Victory.Draw;
}

function isGameOver(){
    const result = check(board, current);
    if (result === Victory.PlayerX){
        resultText.textContent = "The player 'X' won !";
        gameOver = true;
    } else if (result === Victory.ComputerO){
        resultText.textContent = "The A.I. 'O' won !";
        gameOver = true;
    } else if (result === Victory.Draw){
        resultText.textContent = "It is a draw !";
        gameOver = true;
    } 
}

reset.addEventListener('click', () => {
    window.location.reload();
});


for (let i = 0; i < 9; i++) {
        const box = document.getElementById(`${i}`);
        box.addEventListener('click', () => {
        boxClick(box);
        });
}
  
function boxClick(box) {
    if (board[box.id] === '' && player_turn && !gameOver) {
        box.innerHTML = current;
        player_turn = false;
        board[box.id] = current;
        isGameOver();
        current = nextTurn(current);
        setTimeout(computer, 1000);
    }
}

function computer(){
    const i = minimax();
    console.log("Computer plays ", i);
    board[i] = current;
    document.getElementById(i).innerHTML = current;
    isGameOver();
    current = nextTurn(current);
    player_turn = true;
}

class Node {
    constructor(data) {
      this.data = data;
      this.children = [];
    }
}

function minimax(){
    function getAvailablePlaces(board){
        return board.reduce((acc, value, index) => {
            if (value === '') {
              acc.push(index);
            }
            return acc;
        }, []);
    }

    function getNextMoves(board, current){
        const available = getAvailablePlaces(board);
        const moves = [];
        for (let i = 0; i < available.length; i++){
            const boardMove = [...board];
            boardMove[available[i]] = current;
            moves.push(boardMove);
        }
        return moves;
    }

    function getRecScore(node, turn){
        const victoryResult = check(node.data, nextTurn(turn));
        const availablePlaces = (getAvailablePlaces(node.data).length + 1);
        if (victoryResult === Victory.ComputerO){
            return 1 * availablePlaces;
        } else if (victoryResult === Victory.PlayerX){
            return -1 * availablePlaces;
        } else if (victoryResult === Victory.Draw){
            return 0;
        }
        const children = getNextMoves(node.data, turn);
        for (let i = 0; i < children.length; i++){
            const newNode = new Node(children[i]);
            node.children.push(newNode);
        }
        const scores = node.children.map((nodeToExpl) => getRecScore(nodeToExpl, nextTurn(turn)));
        if (turn === 'O'){
            return Math.max(...scores);
        } else {
            return Math.min(...scores);
        }
    }

    const moves = getNextMoves(board, current);
    const idx = getAvailablePlaces(board);
    const scores = [];
    for (let i = 0; i < idx.length; i++){
        const moveNode = new Node(moves[i]);
        scores.push(getRecScore(moveNode, nextTurn(current)));
    }
    console.log("moves ", idx);
    console.log("scores ", scores);
    const bestScore = Math.max(...scores);
    const idxBestScore = scores.indexOf(bestScore);
    return idx[idxBestScore];
}