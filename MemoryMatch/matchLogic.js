// matchlogic
async function MakeBoard(totalMatch){
    const gameBoard = document.getElementById("gameBoard");
    // clear board
    gameBoard.innerHTML = ""
    
    let cards = [];
    for (let i = 0; i < totalMatch*2;i++){
        cards.push(Math.floor(i/2));
    }

    console.log(cards)
    cards = shuffleArray(cards)
    console.log(cards)

    cards.forEach((value) => {
        // create card with card class and value
        const card = document.createElement("div");
        card.classList.add("card")
        card.dataset.value = value;

        // Create card inner div
        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner")
        cardInner.textContent = value;


        // create front and back states of card.
        const front = document.createElement("div");
        front.classList.add("front");
        front.textContent = value;

        const back = document.createElement("div");
        back.classList.add("back");
        back.textContent = "?";

        card.appendChild(cardInner);
        cardInner.appendChild(front);
        cardInner.appendChild(back);

        // replace with flip animation.
        const getCard = document.querySelector(".card");
        getCard.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

        // Add card to board
        gameBoard.appendChild(card);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}


MakeBoard(8);

// timer

// matchcount