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

let hangmanStart = document.getElementById("hangman-start");
    hangmanStart.textContent = "Press Any Key to Start";

let h1 = document.createElement('h1');
    hangmanStart.appendChild(h1);
    h1.textContent = 'Press Any Key to Start . . .';