const board = document.getElementById('board');
const status = document.getElementById('status');
const restart = document.getElementById('restart');
const scores = document.getElementById('scores');
const X_IMAGE = 'Crossline.png ';
const O_IMAGE = 'Circle.png';

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);
let player1Score = 0;
let player2Score = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      const winner = boardState[a];
      if (winner === 'X') player1Score++;
      if (winner === 'O') player2Score++;
      scores.innerHTML = `<span>Player 1 (X): ${player1Score}</span><span>Player 2 (O): ${player2Score}</span>`;
      status.textContent = `Player ${winner === 'X' ? '1' : '2'} wins!`;
      return;
    }
  }
  if (!boardState.includes(null)) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.getAttribute('data-index');

  if (boardState[cellIndex] || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  const img = document.createElement('img');
  img.src = currentPlayer === 'X' ? X_IMAGE : O_IMAGE;
  cell.appendChild(img);
  cell.classList.add('taken');

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
  }
}
function restartGame() {
  boardState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player 1's turn";
  board.innerHTML = '';
  createBoard();
}
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}
createBoard();
restart.addEventListener('click', restartGame);
