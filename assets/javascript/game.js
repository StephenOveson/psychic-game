let possibleWords = ['Jasmine', 'Ariel', 'Elsa', 'Anna', 'Aurora', 'Belle', 'Snow White', 'Cinderella', 'Tiana', 'Rapunzel', 'Pocahontas', 'Mulan', 'Merida', 'Leia'];
let possibleAudios = [];
let wins = 0;
let currentWord;
let currentAudio;
let guessesRemaining;
let lettersGuessed;
let pressStart;
let musicPlay;
let musicPause;


function initAudio() {
    for(let i = 0; i < possibleWords.length; i++)
        possibleAudios[i] = new Audio("assets/audio/" + possibleWords[i] + ".mp3");
}
initAudio();


document.getElementById('play').onClick = function() {
    currentAudio.play();
};

document.getElementById('pause').onClick = function() {
    currentAudio.pause();
};


function initGame() {
    if (currentAudio)
        currentAudio.pause();
    assignCurrentWord();
    currentAudio.play();
    setEventListeners();
    guessesRemaining = 5;
    lettersGuessed = [];
    updateDOM();
}
initGame();


function wordHasBeenGuessed() {
    for (let i = 0; i < currentWord.length; i++) {
        if (!letterHasBeenGuessed(currentWord[i]))
            return false;
    }
    return true;
}


function assignCurrentWord() {
    const index = Math.floor(Math.random() * ((possibleWords.length - 1) - 0 + 1)) + 0;
    // const index = 6;
    currentWord = possibleWords[index];
    currentAudio = possibleAudios[index];
}


function setEventListeners() {
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
            initGame();
        }
        shouldGuessesGoDown(press.key);
        console.log(currentWord, lettersGuessed, guessesRemaining);
        updateDOM();
        checkIfUserLost();
        currentAudio.play();
    }
}


function checkIfUserLost() {
    if (guessesRemaining <= 0) {
        wins = 0;
        alert('Your Prince Will Never Come\n\nYou Lose');
        initGame();
    }
}


function shouldGuessesGoDown(lettersGuessed) {
    if (!currentWord.includes(lettersGuessed))
        guessesRemaining--;
}


function updateDOM() {
    document.getElementById("guesses-remaining").textContent = guessesRemaining;
    document.getElementById("letters-guessed").textContent = lettersGuessed;
    showLettersOrDashes();
}


function showLettersOrDashes() {
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
    let audio = new Audio('audio_file.mp3');
    audio.play();