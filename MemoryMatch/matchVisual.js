// Card flip animation

const card = document.querySelector(".card");

card.addEventListener("click", () => {
    card.classList.toggle("flipped");
});

// .card {
//     width: 100px;
//     height: 100px;
//     perspective: 1000px;
// }
// .card-inner {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     text-align: center;
//     transition: transform 0.8s;
//     transform-style: preserve-3d;
// }

// .flip {
//     transform: rotateY(180deg);
// }

// .card-front, .card-back {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     backface-visibility: hidden;
// }

// .card-front {
//     background-color: gray;
// }

// .card-back {
//     background-color: dodgerblue;
//     transform: rotateY(180deg);
// }

// <div>
//     <p>Temporary card flip testing div. Will be removed.</p>
//     <div class="card">
//         <div class="card-inner">
//             <div class="card-front">
//                 <p>F</p>
//             </div>
//             <div class="card-back">
//                 <p>B</p>
//             </div>
//         </div>
//     </div>
// </div>
// <br>