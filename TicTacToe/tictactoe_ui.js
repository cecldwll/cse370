import { 
    board, HUMAN, AI,
    setHumanSymbol,
    checkWinner,
    aiMove,
    resetBoard
} from "./tictactoe_logic.js";

let wins = 0;
let attempts = Number(localStorage.getItem("ttt_attempts")) || 0;
const attemptsBox = document.getElementById("attempts");    
attemptsBox.textContent = `Attempts: ${attempts}`;
const winsBox = document.getElementById("wins");

const cells = document.querySelectorAll(".cell");
const messageBox = document.getElementById("message");
const resetBtn = document.getElementById("reset-button");

const selectX = document.getElementById("choose-x");
const selectO = document.getElementById("choose-o");

let gameOver = false;
let movesMade = 0;
let selectionLocked = false;


/* ------------------------------------------------------
   PLAYER SYMBOL SELECTION (acts like a reset)
--------------------------------------------------------- */
selectX.addEventListener("click", () => {
    switchSymbol("X");
});

selectO.addEventListener("click", () => {
    switchSymbol("O");
});


function switchSymbol(symbol) {
    // Update UI toggle appearance
    if (symbol === "X") {
        selectX.classList.add("active");
        selectO.classList.remove("active");
    } else {
        selectO.classList.add("active");
        selectX.classList.remove("active");
    }

    // Update logic: X/O assigned fresh
    setHumanSymbol(symbol);

    // Hard reset game state
    resetBoard();
    gameOver = false;
    messageBox.textContent = "";
    render();

    // If human is O, AI plays first
    if (symbol === "O") {
        const aiIndex = aiMove();
        board[aiIndex] = AI;
        render();
    }
}


/* ------------------------------------------------------
   HANDLE HUMAN CLICK
--------------------------------------------------------- */
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => humanMove(index));
});

function humanMove(index) {
    if (gameOver) return;
    if (board[index] !== "") return;

    // Lock symbol choice permanently after first move
    selectionLocked = true;

    board[index] = HUMAN;
    render();

    let result = checkWinner();
    if (handleResult(result)) return;

    // AI turn
    const aiIndex = aiMove();
    board[aiIndex] = AI;
    render();

    result = checkWinner();
    handleResult(result);
}



/* ------------------------------------------------------
   HANDLE GAME RESULT
--------------------------------------------------------- */
function handleResult(result) {
    if (!result) return false;

    gameOver = true;

    attempts++;
    localStorage.setItem("ttt_attempts", attempts);
    attemptsBox.textContent = `Attempts: ${attempts}`;

    if (result === HUMAN) {
        // Human can't win, but just in case.
        wins++;
        winsBox.textContent = `Wins: ${wins}`;
        messageBox.textContent = "Thats literally not possible.";
    }
    else if (result === AI) {
        messageBox.textContent = "AI wins!";
    }
    else {
        messageBox.textContent = "It's a draw!";
    }

    return true;
}


/* ------------------------------------------------------
   RENDER BOARD
--------------------------------------------------------- */
function render() {
    board.forEach((value, index) => {
        cells[index].textContent = value;
    });
}



/* ------------------------------------------------------
   RESET GAME
--------------------------------------------------------- */
resetBtn.addEventListener("click", () => {
    resetBoard();
    gameOver = false;
    selectionLocked = false;
    messageBox.textContent = "";
    render();

    // AI goes first if human chose O
    if (HUMAN === "O") {
        selectionLocked = true; // lock selection so player can't switch
        const aiIndex = aiMove();
        board[aiIndex] = AI;
        render();
    }
});
