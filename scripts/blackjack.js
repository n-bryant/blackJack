"use strict";

const blackjackModule = (function() {
  const display = document.getElementById('cards');

  class Game {
    constructor() {
      this.cards = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
      this.gameEnd;
      this.playerHand = [];
      this.playerHandTotal = 0;
      this.init();
    }

    deal() {
      // deal starting cards
      let firstCard = this.cards[Math.floor(Math.random() * this.cards.length)];
      this.playerHand.push(firstCard);
      this.buildCard(firstCard);

      let secondCard = this.cards[Math.floor(Math.random() * this.cards.length)];
      this.playerHand.push(secondCard);
      this.buildCard(secondCard);
    }

    buildCard(card) {
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.innerHTML = card;
      display.appendChild(newCard);
    }

    getHandTotal() {
      // add up playerHand total
      let playerCardTotal = 0;
      this.playerHand.forEach((card) => {
        if (Number(card)) {
          playerCardTotal += Number(card);
        }
        else {
          if (card === 'J' || card === 'Q' || card === 'K') {
            playerCardTotal += 10;
          }
          if (card === 'A') {
            if (playerCardTotal <= 10) {
              playerCardTotal += 11;
            } else {
              playerCardTotal += 1;
            }
          }
        }
      });

      this.playerHandTotal = playerCardTotal;
      console.log(playerCardTotal);
    }

    // evaluate score and display the game result
    checkResult(standing, hitting) {
      if(!this.gameEnd) {
        this.getHandTotal();
        let result = '';

        if (this.playerHandTotal <= 15 && standing) {
          this.gameEnd = true;
          result = 'Dealer Wins';
          this.gameOver(result);
        } else if ((this.playerHandTotal >= 16 && this.playerHandTotal <= 18) && standing) {
          this.gameEnd = true;
          result = 'Push!';
          this.gameOver(result);
        } else if ((this.playerHandTotal > 18 && this.playerHandTotal < 21 && (hitting || standing))
                 || this.playerHandTotal === 21) {
          this.gameEnd = true;
          result = 'You win!';
          this.gameOver(result);
        } else if (this.playerHandTotal > 21) {
          this.gameEnd = true;
          result = 'You Bust.';
          this.gameOver(result);
        }
      }
    }

    // end game and display results
    gameOver(result) {
      const resultContainer = document.querySelector('.result-container');
      const gameResult = document.querySelector('.game-result');
      gameResult.innerHTML = result;
      resultContainer.classList.add('show');
    }

    init() {
      this.deal();
      this.checkResult(false, false);
    }
  }

  // add new card to hand and evaluate new hand result
  function hit() {
    let newCard = round.cards[Math.floor(Math.random() * round.cards.length)];

    round.playerHand.push(newCard);
    if (!round.gameEnd) {
      round.buildCard(newCard);
      round.checkResult(false, true);
    }
  }

  // end game and evaluate result
  function stand() {
    round.checkResult(true, false);
  }

  // create new Game instance
  const round = new Game();

  return {
    hit: hit,
    stand: stand
  }
})();


// stand click event handler
document.getElementById('stand').addEventListener('click', function() {
  blackjackModule.stand();
});

// hit click event handler
document.getElementById('hit').addEventListener('click',function() {
  blackjackModule.hit();
});

// play Again
document.querySelector('.reset').addEventListener('click', function() {
  location.reload();
})
