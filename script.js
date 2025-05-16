const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const messageText = document.getElementById('messageText');
const restartButton = document.getElementById('restartButton');

const WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

let isXTurn = true;

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.style.display = 'none';
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function placeMark(cell, mark) {
  cell.textContent = mark;
  cell.classList.add(mark.toLowerCase());
}

function checkWin(currentClass) {
  return WIN_COMBOS.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function endGame(draw, winner = '') {
  if (draw) {
    messageText.textContent = "It's a Draw!";
  } else {
    messageText.textContent = `${winner} Wins! 🎉`;
  }
  winningMessage.style.display = 'block';
}

restartButton.addEventListener('click', startGame);
