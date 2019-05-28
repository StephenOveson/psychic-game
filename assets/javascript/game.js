let disneyWords = ['Jasmine', 'Ariel', 'Elsa', 'Anna', 'Aurora', 'Belle', 'Snow White', 'Cinderella', 'Tiana', 'Rapunzel', 'Pocahontas', 'Mulan', 'Merida', 'Leia'];
let disneyAudios = [];
let wins = 0;
let currentWord;
let currentAudio;
let totalGuesses;
let lettersGuessed;
let pressStart;
let musicPlay;
let musicPause;
let gameStart = false;

function pressAny(){
    document.onkeyup = function() {
        if (gameStart = false){
            return;
        } else {
            clearDOM();
            beginGame();
        }
    }
};
pressAny();


let letsGo = document.getElementById('press-any');
letsGo.addEventListener('keyup', function(){
    gameStart = true;
});


function clearDOM() {
    letsGo.textContent = '';
};


function initAudio() {
    for(let i = 0; i < disneyWords.length; i++)
        disneyAudios[i] = new Audio("assets/audio/" + disneyWords[i] + ".mp3");
}
initAudio();


document.getElementById('play').addEventListener('click', function(){
    currentAudio.play();
});

document.getElementById('stop').addEventListener('click', function(){
    currentAudio.pause();
});


function beginGame() {
    if (currentAudio)
        currentAudio.pause();
    assignCurrentWord();
    takeGuess();
    totalGuesses = 5;
    lettersGuessed = [];
    refreshPage();
}


function wordHasBeenGuessed() {
    for (let i = 0; i < currentWord.length; i++) {
        if (!letterHasBeenGuessed(currentWord[i]))
            return false;
    }
    return true;
}


function assignCurrentWord() {
    const index = Math.floor(Math.random() * ((disneyWords.length - 1) - 0 + 1)) + 0;
    // const index = 6;
    currentWord = disneyWords[index];
    currentAudio = disneyAudios[index];
}


function takeGuess() {
    document.onkeyup = function (press) {
        if (press.which < 48 || press.which > 90)
            return;
        if (press.altKey || press.metaKey || press.ctrlKey)
            return;
        if (letterHasBeenGuessed(press.key))
            return;
        lettersGuessed.push(press.key.toUpperCase());
        if (wordHasBeenGuessed()) {
            wins++;
            document.getElementById('wins-count').textContent = wins;
            beginGame();
        }
        guessMinus(press.key);
        refreshPage();
        userLost();
        currentAudio.play();
    }
}


function userLost() {
    if (totalGuesses <= 0) {
        wins = 0;
        alert('Your Prince Will Never Come\n\nYou Lose');
        beginGame();
    }
}


function guessMinus(lettersGuessed) {
    if (!currentWord.includes(lettersGuessed))
        totalGuesses--;
}


function refreshPage() {
    document.getElementById("guesses-remaining").textContent = totalGuesses;
    document.getElementById("letters-guessed").textContent = lettersGuessed;
    hiddenUntilGuessed();
}


function hiddenUntilGuessed() {
    let displayWord = '';
    for (let i = 0; i < currentWord.length; i++) {
        let letter = currentWord[i];
        if (letter === ' ') {
            displayWord += '\n';
        } else if (letterHasBeenGuessed(letter)) {
            displayWord += letter + ' ';
        } else {
            displayWord += '_' + ' ';
        }
    }

    document.getElementById('display-word').textContent = displayWord;
}


function letterHasBeenGuessed(letter) {
    return letter === ' ' || lettersGuessed.includes(letter.toUpperCase());
}