const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreText = document.getElementById('score');
const highScoreText = document.getElementById('high-score');
const restartBtn = document.getElementById('restart');

let sequence = [];
let playerIndex = 0;
let acceptingInput = false;

/* -----------------------------
   LOCAL STORAGE (HIGH SCORE)
------------------------------ */

const HIGH_SCORE_KEY = 'sequenceHighScore';

function getHighScore() {
  return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}

function setHighScore(score) {
  localStorage.setItem(HIGH_SCORE_KEY, score);
}

function updateHighScoreDisplay() {
  highScoreText.textContent = `High Score: ${getHighScore()}`;
}

/* -----------------------------
   UTILITY
------------------------------ */

const wait = ms => new Promise(res => setTimeout(res, ms));

async function flashCell(index) {
  cells[index].classList.add('active');
  await wait(400);
  cells[index].classList.remove('active');
  await wait(150);
}

/* -----------------------------
   GAME LOGIC
------------------------------ */

async function playSequence() {
  acceptingInput = false;
  statusText.textContent = 'Watch the sequence';

  for (const index of sequence) {
    await flashCell(index);
  }

  playerIndex = 0;
  acceptingInput = true;
  statusText.textContent = 'Repeat the sequence';
}

function nextRound() {
  sequence.push(Math.floor(Math.random() * 9));
  scoreText.textContent = `Score: ${sequence.length - 1}`;
  playSequence();
}

function gameOver() {
  acceptingInput = false;
  statusText.textContent = 'Game Over';

  const finalScore = sequence.length - 1;
  const highScore = getHighScore();

  if (finalScore > highScore) {
    setHighScore(finalScore);
    updateHighScoreDisplay();
  }
}

/* -----------------------------
   EVENTS
------------------------------ */

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!acceptingInput) return;

    const index = Number(cell.dataset.index);
    flashCell(index);

    if (index !== sequence[playerIndex]) {
      gameOver();
      return;
    }

    playerIndex++;

    if (playerIndex === sequence.length) {
      acceptingInput = false;
      setTimeout(nextRound, 800);
    }
  });
});

restartBtn.addEventListener('click', () => {
  sequence = [];
  playerIndex = 0;
  scoreText.textContent = 'Score: 0';
  statusText.textContent = 'Watch the sequence';
  nextRound();
});

/* -----------------------------
   INIT
------------------------------ */

updateHighScoreDisplay();
