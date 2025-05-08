const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');  
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 400;
ctx.canvas.height = 400;

const bodyParts = [  
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1],
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyParts = (bodyPart) => {
    ctx.fillStyle = '#d95d59';
    ctx.fillRect(...bodyPart);
}

const wrongLetters = () => {
    addBodyParts(bodyParts[mistakes]);  
    mistakes++;
    if(mistakes === bodyParts.length) endGame();  
}

const endGame = () => {
    document.removeEventListener('keydown', letterElement);
    startButton.style.display = 'block';  
}

const correctLetter = letter => {  
    const { children } = wordContainer;
    for(let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }   
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    } else {
        wrongLetters();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterElement = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[A-ZÑ]$/) && !usedLetters.includes(newLetter)){
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width = 400;
    ctx.canvas.height = 400;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d59';
    
    // Ajustes de coordenadas para centrar el dibujo
    ctx.fillRect(8, 7, 4, 1);   // Base horizontal centrada
    ctx.fillRect(10, 0, 1, 8);  // Palo vertical (centrado)
    ctx.fillRect(6, 0, 7, 1);   // Travesaño superior
    ctx.fillRect(5, 1, 1, 1);   // Soporte de la soga
};


const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';  
    selectRandomWord();
    drawWord();
    drawHangMan();
    document.addEventListener('keydown', letterElement);
};

startButton.addEventListener('click', startGame);