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
  moveCounter.textContent = "Moves: " + moveCounter.dataset.value;
}

function ScoreMatch() {
  score++;
  console.log("Score:", score);
  if (score === totalMatch) {
    // Wait until the final card is fully flipped before displaying the win message
    setTimeout(() => {
      alert("You win!");
    }, 600);
  }
}

// Start game
MakeBoard(totalMatch);
CardEventListeners();
