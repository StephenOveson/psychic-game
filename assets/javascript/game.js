let disneyWords = ['Jasmine', 'Ariel', 'Elsa', 'Anna', 'Aurora', 'Belle', 'Snow White', 'Cinderella', 'Tiana', 'Rapunzel', 'Pocahontas', 'Mulan', 'Merida', 'Leia', 'Moana'];
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
let hiddenButton = false;
let playbackRate = 1;

function pressAny(){
    document.onkeyup = function() {
        if (gameStart = false){
            return;
        } else {
            clearDOM();
            beginGame();
            action();
        }
    }
};
pressAny();


let princessText = document.getElementById('princess-game')
let letsGo = document.getElementById('press-any');
letsGo.addEventListener('keyup', function(){
    gameStart = true;
    hiddenButton = true;
});
princessText.textContent = 'Princesses Word Game'
letsGo.textContent = 'Press Any Key to Start!'


function clearDOM() {
    letsGo.textContent = '';
    princessText.textContent = '';
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


document.getElementById('play').style.visibility = 'hidden';
document.getElementById('stop').style.visibility = 'hidden';


function action() {
    if(hiddenButton = false) {
        return;
    } else {
        document.getElementById('play').style.visibility = 'visible';
        document.getElementById('stop').style.visibility = 'visible';

    }
}


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
    currentAudio.playbackRate = playbackRate;
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
            playbackRate = 1;
            document.getElementById('wins-count').textContent = 'Wins ' + wins;
            beginGame();
        }
        guessMinusIfNeeded(press.key);
        refreshPage();
        userLost();
        currentAudio.play();
    }
}


function userLost() {
    if (totalGuesses <= 0) {
        wins = 0;
        playbackRate /= 2
        if (playbackRate < 0.0625){
            playbackRate = 0.0625;
        }
        alert('Your Prince Will Never Come\n\nYou Lose');
        beginGame();
    }
}


function guessMinusIfNeeded(letter) {
    if (!currentWord.toUpperCase().includes(letter.toUpperCase())){
        totalGuesses--;
    }
}


function refreshPage() {
    document.getElementById("guesses-remaining").textContent = 'Guesses Remaining ' + totalGuesses;
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