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
let currentWord = 'Jasmine';
let guessesRemaining = 5;
let lettersGuessed = [];

function initGame() {
    assignCurrentWord()
    setEventListeners()
    updateDOM()
  }
  initGame()
  function wordHasBeenGuessed(){
    for(let i=0; i<currentWord.length; i++){
      if(lettersGuessed.includes(currentWord[i])){
        
      } else {
        return false
      }
    }
    return true
  }
  function assignCurrentWord() {
    const index = Math.floor(Math.random() * ((possibleWords.length -1) - 0 + 1)) + 0;
    currentWord = possibleWords[index]
  }
  function setEventListeners(){
    document.onkeyup = function(e){
      lettersGuessed.push(e.key)
      if(wordHasBeenGuessed()){
        wins++
        document.getElementById('wins-count').textContent = wins
        initGame()
      }
      shouldGuessesGoDown(e.key)
      console.log(currentWord, lettersGuessed, guessesRemaining)
      updateDOM()
      checkIfUserLost()
    }
  }
  function checkIfUserLost(){
    if(guessesRemaining <= 0){
      alert('you lost')
    }
  }
  function shouldGuessesGoDown(lettersGuessed){
    if(!currentWord.includes(lettersGuessed)){
      guessesRemaining = guessesRemaining - 1
    }
  }
  function updateDOM(){
    document.getElementById("guesses-remaining").textContent = guessesRemaining
    document.getElementById("letters-guessed").textContent = lettersGuessed
    showLettersOrDashes()
  }
  function showLettersOrDashes() {
    let displayWord = ''
    for(let i=0; i<currentWord.length; i++){
      if(lettersGuessed.includes(currentWord[i])){
        displayWord = displayWord + currentWord[i] + ' '
      } else {
        displayWord = displayWord + '_' + ' '
      }
    }
    document.getElementById('display-word').textContent = displayWord
  }



