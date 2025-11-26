/* ------------------------------------------------------
   TIC TAC TOE GAME LOGIC (Minimax AI)
--------------------------------------------------------- */

export let board = ["", "", "", "", "", "", "", "", ""];

export let HUMAN = "X";
export let AI = "O";

export function setHumanSymbol(symbol) {
    HUMAN = symbol;
    AI = (symbol === "X" ? "O" : "X");
}


/**
 * checkWinner
 * Returns: "X", "O", "draw", or null
 */
export function checkWinner(b = board) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],  
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let [a,b1,c] of winPatterns) {
        if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
            return b[a];
        }
    }

    if (b.every(cell => cell !== "")) return "draw";
    return null;
}



/**
 * minimax – unbeatable AI
 */
function minimax(newBoard, player) {
    let winner = checkWinner(newBoard);
    if (winner === HUMAN) return { score: -1 };
    if (winner === AI) return { score: 1 };
    if (winner === "draw") return { score: 0 };

    const moves = [];

    newBoard.forEach((cell, index) => {
        if (cell === "") {
            let move = { index };
            newBoard[index] = player;

            move.score = minimax(
                newBoard, 
                player === AI ? HUMAN : AI
            ).score;

            newBoard[index] = "";
            moves.push(move);
        }
    });

    return (player === AI)
        ? moves.reduce((best, m) => m.score > best.score ? m : best)
        : moves.reduce((best, m) => m.score < best.score ? m : best);
}



/**
 * aiMove – returns index 0–8
 */
export function aiMove() {
    return minimax([...board], AI).index;
}



/**
 * resetBoard
 */
export function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
}
