// matchlogic
async function MakeBoard(totalMatch){
    let cards = [];
    for (let i = 0; i < totalMatch*2;i++){
        cards.push(Math.floor(i/2));
    }

    console.log(cards)
    cards = shuffleArray(cards)
    console.log(cards)

};

async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}


MakeBoard(8);

// timer

// matchcount