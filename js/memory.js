class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards=[]
    this.pairsClicked=0
    this.pairsGuessed=0
  }

  shuffleCards(){
    console.log('-->',this.cards)
    this.cards.sort((a,b)=> 0.5 - Math.random())
    console.log('post',this.cards)
  }

  checkIfPair(card1, card2) {

    console.log(card1,card2)
    this.pairsClicked++
    if(card1.getAttribute('data-card-name')===card2.getAttribute('data-card-name')){
      console.log('pair')
      this.pairsGuessed++
      return true
    }else{
      console.log('no pair')
      return false
    }
    
  }

  checkIfFinished() {
    return this.pairsGuessed===12 
  }
  restart(){
    this.pickedCards=[]
    this.pairsClicked=0
    this.pairsGuessed=0
    this.shuffleCards()
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;

