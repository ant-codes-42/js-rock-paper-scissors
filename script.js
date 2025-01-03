const btnStart = document.querySelector('#submit'); // Selects the submit button
const btnClear = document.querySelector('#clear'); // Selects the clear button
const btnRetrieve = document.querySelector('#retrieve'); // Selects the retrieve button
const playerOptions = document.querySelectorAll('input[name="player"]'); // Selects the radio buttons
const computerOptions = ['rock', 'paper', 'scissors'];
let playerChoice = ''; // Initializes the playerChoice variable
let computerChoice = ''; // Initializes the computerChoice variable
let playerWin = parseInt(localStorage.getItem('playerWin')) || 0; // Initializes the playerWin variable
let computerWin = parseInt(localStorage.getItem('computerWin')) || 0; // Initializes the computerWin variable
let tie = parseInt(localStorage.getItem('tie')) || 0; // Initializes the tie variable
let numRock = parseInt(sessionStorage.getItem('numRock')) || 1; // Initializes the numRock variable
let numScissors = parseInt(sessionStorage.getItem('numScissors')) || 1; // Initializes the numScissors variable
let numPaper = parseInt(sessionStorage.getItem('numPaper')) || 1; // Initializes the numPaper variable

// Marks the player's choice in playerChoice variable, increments the corresponding variable, and stores the result in localSessionStorage
function markPlayerChoice() {
    playerOptions.forEach((option) => {
        if (option.checked) {
            playerChoice = option.value;
        }
    });
    if (playerChoice === 'rock') {
        numRock++;
        sessionStorage.setItem('numRock', numRock);
    } else if (playerChoice === 'scissors') {
        numScissors++;
        sessionStorage.setItem('numScissors', numScissors);
    } else if (playerChoice === 'paper') {
        numPaper++;
        sessionStorage.setItem('numPaper', numPaper);
    }
}

// Function to generate a weighted random choice for the computer based on the player's choices (see startgame function)
function weightedRandom(items, weights) {
    let totalWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        totalWeight += weights[i];
    }

    let random = Math.random() * totalWeight;
    let currentWeight = 0;

    for (let i = 0; i < items.length; i++) {
        currentWeight += weights[i];
        if (random < currentWeight) {
            return items[i];
        }
    }
}

/*function markComputerChoice() {
    const computerOptions = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * computerOptions.length);
    computerChoice = computerOptions[randomIndex];
}*/

function scoreGame() {
    console.log('Score game');
    if (playerChoice === computerChoice) {
        tie++;
        localStorage.setItem('tie', tie);
        document.getElementById('tie-score').textContent = tie;
        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;
        document.getElementById('winner').textContent = 'Tie';
    } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
        playerWin++;
        localStorage.setItem('playerWin', playerWin);
        document.getElementById('player-score').textContent = playerWin;
        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;
        document.getElementById('winner').textContent = 'Player';
    } else if (playerChoice === 'paper' && computerChoice === 'rock') {
        playerWin++;
        localStorage.setItem('playerWin', playerWin);
        document.getElementById('player-score').textContent = playerWin;
        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;
        document.getElementById('winner').textContent = 'Player';
    } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
        playerWin++;
        localStorage.setItem('playerWin', playerWin);
        document.getElementById('player-score').textContent = playerWin;
        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;
        document.getElementById('winner').textContent = 'Player';
    } else {
        computerWin++;
        localStorage.setItem('computerWin', computerWin);
        document.getElementById('computer-score').textContent = computerWin;
        document.getElementById('player-choice').textContent = playerChoice;
        document.getElementById('computer-choice').textContent = computerChoice;
        document.getElementById('winner').textContent = 'Computer';
    }
}

function startGame() {
    console.log('Game started');
    markPlayerChoice();
    //markComputerChoice();
    //const computerOptions = ['rock', 'paper', 'scissors'];
    computerChoice = weightedRandom(computerOptions, [numScissors, numRock, numPaper]);
    scoreGame();
}

btnStart.addEventListener('click', (event) => {
    event.preventDefault();
    startGame();
});

btnClear.addEventListener('click', (event) => {
    if (window.confirm("Are you sure you want to clear the scores?")) {
    localStorage.clear();
    playerWin = 0;
    computerWin = 0;
    tie = 0;
    document.getElementById('player-score').textContent = playerWin;
    document.getElementById('computer-score').textContent = computerWin;
    document.getElementById('tie-score').textContent = tie;
    }
});

function retrieveScores() {
    playerWin = parseInt(localStorage.getItem('playerWin')) || 0;
    computerWin = parseInt(localStorage.getItem('computerWin')) || 0;
    tie = parseInt(localStorage.getItem('tie')) || 0;
    document.getElementById('player-score').textContent = playerWin;
    document.getElementById('computer-score').textContent = computerWin;
    document.getElementById('tie-score').textContent = tie;
}

btnRetrieve.addEventListener('click', (event) => {
    event.preventDefault();
    retrieveScores();
});