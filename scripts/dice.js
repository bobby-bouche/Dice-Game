
const homeScreen = document.getElementById("home-screen");
const newGameBtn = document.getElementById("new-game");

const quitWindow     = document.getElementById("confirm-quit-container");
const confirmQuitBtn = document.getElementById("confirm-quit-yes");
const cancelQuitBtn  = document.getElementById("confirm-quit-no");

const narratorPopUp = document.getElementById("narrator-popup");
const narratorMsg   = document.getElementById("narrator-message");
const narratorBtn1  = document.getElementById("narratorBtn1");
const narratorBtn2  = document.getElementById("narratorBtn2");
const narratorImage = document.getElementById("narratorImage");

const playContainer = document.getElementById("play-container");
const quitGameBtn   = document.getElementById("quit-game");
const rollDiceBtn   = document.getElementById("roll-dice");

const playerDie1    = document.getElementById("player-die-1");
const playerDie2    = document.getElementById("player-die-2");
const computerDie1  = document.getElementById("computer-die-1");
const computerDie2  = document.getElementById("computer-die-2");

const playerScoreElem   = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

const gameRulesBtn  = document.getElementById("game-rules");
const closeRulesBtn = document.getElementById("close-rules");
const rulesPopup = document.getElementById("rules-popup");


/* game logic section */
let rounds          = 0; 

const player = {
    score: 0,
    die1: document.getElementById("player-die-1"),
    die2: document.getElementById("player-die-2"),
    scoreElem: document.getElementById("player-score").querySelector('span')
};

const computer = {
    score: 0,
    die1: document.getElementById("computer-die-1"),
    die2: document.getElementById("computer-die-2"),
    scoreElem: document.getElementById("computer-score").querySelector('span')
}; 


/* function to roll dice */
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function calculateScore(die1, die2) {
    if (die1 === 1 || die2 === 1) {
        return 0;
    } else if (die1 === die2) {
        return (die1 + die2) * 2;
    } else {
        return die1 + die2;
    }
}

function updateDiceImages(die1, die2, die1Elem, die2Elem) {
    die1Elem.src = `images/dice/number${die1}.jpg`;
    die2Elem.src = `images/dice/number${die2}.jpg`;
}

function resetDiceImages(die1Elem, die2Elem){
    playerDie1.src   = `images/animations/diceRollLarge.gif`;
    playerDie2.src   = `images/animations/diceRollLarge.gif`;
    computerDie1.src = `images/animations/diceRollLarge.gif`;
    computerDie2.src = `images/animations/diceRollLarge.gif`;
    
}

function rollDice() {
    // Set dice images to the animated GIF
    player.die1.src = 'images/animations/diceRollLarge.gif';
    player.die2.src = 'images/animations/diceRollLarge.gif';
    computer.die1.src = 'images/animations/diceRollLarge.gif';
    computer.die2.src = 'images/animations/diceRollLarge.gif';

    // Wait for 2 seconds before displaying the result
    setTimeout(() => {
        const playerDie1Val = rollDie();
        const playerDie2Val = rollDie();
        const computerDie1Val = rollDie();
        const computerDie2Val = rollDie();

        const playerRoundScore = calculateScore(playerDie1Val, playerDie2Val);
        const computerRoundScore = calculateScore(computerDie1Val, computerDie2Val);

        player.score += playerRoundScore;
        computer.score += computerRoundScore;

        updateDiceImages(playerDie1Val, playerDie2Val, player.die1, player.die2);
        updateDiceImages(computerDie1Val, computerDie2Val, computer.die1, computer.die2);

        player.scoreElem.textContent = player.score;
        computer.scoreElem.textContent = computer.score;

        rounds++;
        if (rounds === 3) {
            setTimeout(() => {
                determineWinner();
            }, 500);
        }
    }, 1000); 
}



function determineWinner() {
    playContainer.style.display = "none";
    let winnerMessage = '';
    if (player.score > computer.score) {
        winnerMessage = "Nice job, ace! You showed 'em who’s boss. Ready to do it all over again? Hit 'Restart' and let's roll!";
        showNarratorPopupWithDelay(winnerMessage, 'Restart', resetGame);
    } else if (computer.score > player.score) {
        winnerMessage = "Tough luck, pal! Looks like the house took this one. Wanna try again? Hit 'Restart' and give it another shot.";
        showNarratorPopupWithDelay(winnerMessage, 'Restart', resetGame);
    } else {
        winnerMessage = "It's a dead heat, see? No winners, no losers. Ready for a rematch? Hit 'Restart' and let's break the tie!";
        showNarratorPopupWithDelay(winnerMessage, 'Restart', resetGame);
    }
}

function showNarratorPopupWithDelay(message, buttonText, buttonAction) {
    narratorMsg.innerHTML = message;
    narratorBtn1.innerHTML = buttonText;
    narratorBtn1.onclick = buttonAction;
    narratorBtn2.style.display = 'none';
    narratorPopUp.classList.remove('show');
    narratorPopUp.style.display = 'block';
    setTimeout(() => {
        narratorPopUp.classList.add('fade-in');
        narratorPopUp.classList.add('show');
    }, 1000);
}

function resetGame() {
    player.score = 0;
    computer.score = 0;
    rounds = 0;
    player.scoreElem.textContent = player.score;
    computer.scoreElem.textContent = computer.score;
    resetDiceImages();
}


// function to quit the current game
narratorBtn2.addEventListener("click", function(){
    quitWindow.style.display = "block";
    narratorPopUp.style.display = "none";
})


// confirms quit and exists current game 
confirmQuitBtn.addEventListener("click", function(){
    quitWindow.style.display = "none";
    homeScreen.style.display = "block";
    body.style.backgroundImage  = "url('images/backgrounds/home.jpg')";
})


// cancels quit option
cancelQuitBtn.addEventListener("click", function(){
    narratorPopUp.style.display = "block";
    quitWindow.style.display = "none"
})


// starts new game
newGameBtn.addEventListener("click", function(){
    homeScreen.style.display    = "none";
    narratorPopUp.style.display = "block";
    body.style.backgroundImage  = "url('images/backgrounds/final-boss-background.jpg')";
    const message = `<p>
                      "Hey there, wise guy! Welcome to Underworld Dice! I'm the Dice Don. Time to show if you got the guts to roll with the best!"<br><br>
                    </p>`;
    showNarratorPopupWithDelay(message, 'Play', startGame);
})

// house rules popup
gameRulesBtn.addEventListener("click", function(){
    homeScreen.style.display = "none";
    rulesPopup.style.display = "block";
})


closeRulesBtn.addEventListener("click", function(){
    homeScreen.style.display = "block";
    rulesPopup.style.display = "none";
})

function startGame() {
    narratorPopUp.style.display = "none";
    playContainer.style.display = "block";
    resetGame();
}

narratorBtn1.addEventListener("click", function(){
    narratorPopUp.style.display = "none";
    playContainer.style.display = "block";
}) 

quitGameBtn.addEventListener("click", function(){
    playContainer.style.display = "none";
    quitWindow.style.display    = "block";
})


rollDiceBtn.addEventListener("click", function(){
    if (rounds < 3) {
        rollDice();
    }
});


