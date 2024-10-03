const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X'; // Start with player X
let gameActive = true; // Game is active
let gameState = ['', '', '', '', '', '', '', '', '']; // Track board state

const winningConditions = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];

// Messages for game status
const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusMessage.textContent = currentPlayerTurn();

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateGameState(clickedCell, clickedCellIndex);
    checkForWinner();
}

function updateGameState(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = winningMessage();
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusMessage.textContent = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = currentPlayerTurn();
}

function handleRestartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = currentPlayerTurn();
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
