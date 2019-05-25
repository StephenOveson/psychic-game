// Pseudo Coding
// Hangman Game 
// Display wins - 0
// add a win for each word Solved
// Display a random word
// Display random word as blanks
// guesses display
// wrong guess = 1 try gone
// right guess = display letter
// display "press any key to start"
// when you press key display changes to Hangman game

let possibleWords = ['Jasmine', 'Ariel', 'Elsa', 'Anna', 'Aurora', 'Belle', 'Snow White', 'Cinderella', 'Tiana', 'Rapunzel', 'Pocahontas', 'Mulan', 'Merida'];
let wins = 0;
let currentWord
let guessesRemaining
let lettersGuessed

function initGame() {
    assignCurrentWord()
    setEventListeners()
    guessesRemaining = 5;
    lettersGuessed = [];
    updateDOM()
}
initGame()
function wordHasBeenGuessed() {
    for (let i = 0; i < currentWord.length; i++) {
        if (!letterHasBeenGuessed(currentWord[i]))
            return false;
    }
    return true
}
function assignCurrentWord() {
    // const index = Math.floor(Math.random() * ((possibleWords.length - 1) - 0 + 1)) + 0;
    const index = 6;
    currentWord = possibleWords[index]
}
function setEventListeners() {
    document.onkeyup = function (press) {
        if (press.which < 48 || press.which > 90)
            return;
        if (press.altKey || press.metaKey || press.ctrlKey)
            return;
        if (letterHasBeenGuessed(press.key))
            return;
        lettersGuessed.push(press.key.toUpperCase())
        if (wordHasBeenGuessed()) {
            wins++
            document.getElementById('wins-count').textContent = wins
            initGame()
        }
        shouldGuessesGoDown(press.key)
        console.log(currentWord, lettersGuessed, guessesRemaining)
        updateDOM()
        checkIfUserLost()
    }
}
function checkIfUserLost() {
    if (guessesRemaining <= 0) {
        wins = 0;
        alert('Your Prince Will Never Come\n\nWins Reset!')
        initGame();
    }
}
function shouldGuessesGoDown(lettersGuessed) {
    if (!currentWord.includes(lettersGuessed)) {
        guessesRemaining = guessesRemaining - 1
    }
}
function updateDOM() {
    document.getElementById("guesses-remaining").textContent = guessesRemaining
    document.getElementById("letters-guessed").textContent = lettersGuessed
    showLettersOrDashes()
}
function showLettersOrDashes() {
    let displayWord = ''
    for (let i = 0; i < currentWord.length; i++) {
        let letter = currentWord[i];
        if (letter === ' ') {
            displayWord += '\n'
        }
        else if (letterHasBeenGuessed(letter)) {
            displayWord += letter + ' '
        } else {
            displayWord += '_' + ' '
        }
    }

    document.getElementById('display-word').textContent = displayWord
}

function letterHasBeenGuessed(letter) {
    return letter === ' ' || lettersGuessed.includes(letter.toUpperCase())
}




