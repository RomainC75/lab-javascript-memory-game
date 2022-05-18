const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards()

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if(getComputedStyle(card.children[1]).backfaceVisibility!='visible'){
        console.log(card.querySelector('.front'))
        console.log(`Card clicked: ${card}`);
        console.log(memoryGame.pickedCards)
        if(memoryGame.pickedCards.length==2){
          memoryGame.pickedCards.forEach(card=>hideCard(card))
          memoryGame.pickedCards=[]
        }
        revealCard(card)
        memoryGame.pickedCards.push(card);
        if(memoryGame.pickedCards.length==2){
          if(memoryGame.checkIfPair(memoryGame.pickedCards[0],memoryGame.pickedCards[1])){
            memoryGame.pickedCards=[]
          }
        }
        printScores()
        if(memoryGame.checkIfFinished()){
          printEnding()
        }
        }
    });
  });
});

const printScores = () =>{
  const clickedVal = document.querySelector('#pairs-clicked')
  const guessedVal = document.querySelector('#pairs-guessed')
  clickedVal.textContent = memoryGame.pairsClicked
  guessedVal.textContent = memoryGame.pairsGuessed
}

const revealCard = (card)=>{
  card.querySelector('.back').style.visibility="hidden"
  card.querySelector('.front').style.backfaceVisibility="visible"
}

const hideCard = (card)=>{
  card.querySelector('.back').style.visibility="visible"
  card.querySelector('.front').style.backfaceVisibility="hidden"
}

const printEnding = () =>{
  document.getElementsByClassName('endingBoard')[0].style.display='block'
  document.querySelector('#pairs-clicked-ending').textContent=memoryGame.pairsClicked
  document.querySelector('#pairs-guessed-ending').textContent=memoryGame.pairsGuessed
  document.querySelector('#restart').addEventListener('click',()=>{
    memoryGame.restart()
    printScores()
    dispatchEvent(new Event('load'));
    document.getElementsByClassName('endingBoard')[0].style.display='none'
  })
}
