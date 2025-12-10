function MakeBoard(totalMatch) {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  // create pairs of values
  let cards = [];
  for (let i = 0; i < totalMatch; i++) {
    cards.push(i, i);
  }

  cards = ShuffleArray(cards);

  cards.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = value;

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

    // flip and compare on click
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped")) return;
      card.classList.add("flipped");
        gameBoard.style.pointerEvents = 'none';
      setTimeout(() => {
        gameBoard.style.pointerEvents = 'auto';
      }, 600);
      CompareCards(card, value);
    });
  });
}


function ShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let score = 0;
let chosen = [];
const totalMatch = 8;

function CardEventListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped")) return;

      card.classList.add("flipped");
      const cardValue = Number(card.dataset.value);
      CompareCards(card, cardValue);
    });
  });
}

function CompareCards(card, value) {
  UpdateTurnCounter();
  chosen.push({ card, value });

  if (chosen.length === 2) {
    const [first, second] = chosen;
    if (first.value === second.value) {
      ScoreMatch();
      chosen = [];
    } else {
      setTimeout(() => {
        first.card.classList.remove("flipped");
        second.card.classList.remove("flipped");
        chosen = [];
      }, 1000);
    }
  }
}

function UpdateTurnCounter() {
  const moveCounter = document.getElementById("move-counter");
  moveCounter.dataset.value = Number(moveCounter.dataset.value || 0) + 1;
  moveCounter.textContent = `Moves: ${moveCounter.dataset.value}`;
  // -------start timer start here---------------
  if (moveCounter.dataset.value == 1){stopwatch.start()}
}

function setBestMoves() {
  const bestMovesElement = document.getElementById("best-moves");
  const storedMoves = localStorage.getItem("storedBestMoves");
  if (storedMoves === null) {
    bestMovesElement.dataset.value = Infinity;
    bestMovesElement.textContent = "Best Moves: --";
  } else {
    const value = Number(storedMoves);
    bestMovesElement.dataset.value = value;
    bestMovesElement.textContent = `Best Moves: ${value}`;
  }
}

function ScoreMatch() {
  score++;
  console.log("Score:", score);
  if (score === totalMatch) {
    // Wait until the final card is fully flipped before displaying the win message
    setTimeout(() => {
      // -----------end timer here -------------
    stopwatch.stop();

      // -----------update local storage.------
      alert(`You win! \n It only took you ${stopwatch.timescore}`);
    }, 600);
    // Update best moves counter
    const moveCounterValue = Number(document.getElementById("move-counter").dataset.value);
    const bestMovesElement = document.getElementById("best-moves");
    let storedMoves = Number(localStorage.getItem("storedBestMoves")) || Infinity;
    if (moveCounterValue < storedMoves) {
      localStorage.setItem("storedBestMoves", moveCounterValue);
      storedMoves = moveCounterValue;
    }
    bestMovesElement.dataset.value = storedMoves;
    bestMovesElement.textContent = `Best Moves: ${storedMoves}`;
  }
}

// Start game
MakeBoard(totalMatch);
// --------load local scores-------------
CardEventListeners();








// test

class Stopwatch {
  constructor(displayElement) {
      this.displayElement = displayElement;
      this.startTime = 0;
      this.elapsedTime = 0;
      this.timerInterval = null;
      this.isRunning = false;
      this.timescore = ""
      
  }

  start() {
      if (!this.isRunning) {
          this.startTime = Date.now() - this.elapsedTime;
          this.timerInterval = setInterval(() => this.update(), 10);
          this.isRunning = true;
      }
  }

  stop() {
      if (this.isRunning) {
          clearInterval(this.timerInterval);
          this.elapsedTime = Date.now() - this.startTime;
          this.isRunning = false;
      }
  }

  reset() {
      clearInterval(this.timerInterval);
      this.startTime = 0;
      this.elapsedTime = 0;
      this.isRunning = false;
      this.displayElement.textContent = '00:00.00';
  }

  update() {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - this.startTime;

      let totalMilliseconds = this.elapsedTime;
      let minutes = Math.floor((totalMilliseconds / (1000 * 60)));
      let seconds = Math.floor((totalMilliseconds / 1000) % 60);
      let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliseconds = String(milliseconds).padStart(2, '0');
      this.timescore =`${minutes}:${seconds}.${milliseconds}`;
      this.displayElement.textContent = `Time: ${this.timescore}`;
  }
  // Get the score in milliseconds (for ranking - lower is better)
getScore() {
    return this.elapsedTime;
}

// Get the score in seconds (alternative format)
getScoreInSeconds() {
    return this.elapsedTime / 1000;
}

// Get a formatted time string (for display/storage)
getFormattedTime() {
    let totalMilliseconds = this.elapsedTime;
    let minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    let seconds = Math.floor((totalMilliseconds / 1000) % 60);
    let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}.${milliseconds}`;
}
}

const timer = document.getElementById('Timer')
const stopwatch = new Stopwatch(timer)
