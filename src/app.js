const b0 = document.getElementById('0');
const b1 = document.getElementById('1');
const b2 = document.getElementById('2');
const b3 = document.getElementById('3');
const b4 = document.getElementById('4');
const b5 = document.getElementById('5');
const b6 = document.getElementById('6');
const b7 = document.getElementById('7');
const b8 = document.getElementById('8');

let current = 'X';
let board = new Array(9).fill('');
console.log(board[0]);
let player_turn = true;

function nextTurn(current) {
    return current === 'X' ? 'O' : 'X';
}

function check() {
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
        return true;
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
        return false;
        }
    }
    
    return true;
}


function computer() {
    let i = Math.floor(Math.random() * 9);
    while (board[i] !== '') {
        i = Math.floor(Math.random() * 9);
    }
    board[i] = current;
    console.log(board);
    document.getElementById(i).innerHTML = current;
    check();
    current = nextTurn();
    player_turn = true;
}

for (let i = 0; i < 9; i++) {
        const box = document.getElementById(`${i}`);
        box.addEventListener('click', () => {
        boxClick(box);
        });
  }
  
  function boxClick(box) {
    if (board[box.id] === '' && player_turn) {
        box.innerHTML = current;
        player_turn = false;
        board[box.id] = current;
        console.log(board);
        check();
        current = nextTurn(current);
        setTimeout(computer, 1000);
    }
  }