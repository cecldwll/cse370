// matchlogic
function MakeBoard(totalMatch){
    const gameBoard = document.getElementById("gameBoard");
    // clear board
    gameBoard.innerHTML = ""
    
    let cards = [];
    for (let i = 0; i < totalMatch*2;i++){
        cards.push(i);
    }

    console.log(cards)
    cards = ShuffleArray(cards)
    console.log(cards)

    cards.forEach((value) => {
        // create card with card class and value
        const card = document.createElement("div");
        card.classList.add("card")
        card.dataset.value = value;


        // create front and back states of card.
        const front = document.createElement("div");
        front.classList.add("front");
        front.textContent = value;

        const back = document.createElement("div");
        back.classList.add("back");
        back.textContent = "?";

        card.appendChild(front);
        card.appendChild(back);

        // replace with flip animation.
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

        // Add card to board
        gameBoard.appendChild(card);
    });
}

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}

function CompareCards(newCardValue){
    UpdateTurnCounter();
    console.log(redundancy)
    if (newCardValue != redundancy[0]){
        redundancy.push(newCardValue)
        if (newCardValue % 2 == 1){
            newCardValue -= 1
        }

        chosen.push(newCardValue)

        if (chosen.length() == 2) {
            if (chosen[0] == chosen[1]){
                ScoreMatch();
                
            }
            else {
                // flipcard(redundancy[0]);               
                // flipcard(redundancy[1]);
                chosen.length = 0;
                redundancy.length = 0;
            }
        }

    }
}
function UpdateTurnCounter(){
    const moveCounter = document.getElementById("move-counter");
    moveCounter.dataset.value = Number(moveCounter.dataset.value || 0) + 1;
    moveCounter.textContent = moveCounter.dataset.value; 

}
function ScoreMatch(){
    score += 1
    console.log(score)
}

function CardEventListeners(){
    const cards = document.querySelectorAll(".card")
    cards.forEach(card =>{
        card.addEventListener("click", () =>{
            const cardValue = Number(card.getAttribute("data-value"));
            CompareCards(cardValue);
        })
    })
}



let score = 0
let chosen = [];
let redundancy = [];
MakeBoard(8);
CardEventListeners();

// timer

// matchcount