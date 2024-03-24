const words = ["salmon", "greentea", "honey", "tomorrow", "airplane", "red", "lasagne", "blue", "purple"]
const canvas = document.getElementById('gameCanvas');
const ctx  = canvas.getContext('2d');
let wordY = 0;
let wordX = canvas.width / 2;
let wordSpeed = 2;
let previousWord = "";
let gameActive = false;
let fallingWord = getRandomWord();


function getRandomWord() {
    let newWord = previousWord;
    while (newWord === previousWord) {
        newWord = words[Math.floor(Math.random() * words.length)];
    }
    previousWord = newWord;
    return newWord;
}

function checkAnswer() {
    const wordAnswer = document.getElementById("wordAnswer").value.toLowerCase();
    const gameScore = document.getElementById("gameScore");

    if (wordAnswer == fallingWord.toLowerCase()) {
        let score = parseInt(gameScore.textContent);
        score++;
        gameScore.textContent = score;
        const textWidth = ctx.measureText(fallingWord).width;
        wordY = 0;
        wordX = Math.random() * (canvas.width - 150);
        wordSpeed += 0.07;
        fallingWord = getRandomWord();
    }
}

// the words falling ////////////////////////////////

function drawWord() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.font = "26px Franklin Gothic Medium";
    ctx.fillStyle = "black";
    ctx.fillText(fallingWord, wordX, wordY)
}

function updateWordPosition() {
    wordY += wordSpeed;
    if (wordY > canvas.height) {
        gameActive = false;
        document.getElementById("canvasText").innerText = "Game Over! Score: " + gameScore.textContent + "\ntype start to play again";
        document.getElementById("wordAnswer").value = "";
        gameScore.textContent = 0;
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        wordX = canvas.width / 2;
        wordY = 0;
        wordSpeed = 2;
    }
}

function gameLoop() {
    if(gameActive) {
        document.getElementById("canvasText").innerText = "";
        drawWord();
        updateWordPosition();
        requestAnimationFrame(gameLoop);
    }
}

document.getElementById("wordAnswer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (document.getElementById("wordAnswer").value.toLowerCase() === "start") {
            gameActive = true
            gameLoop();
        } else if (gameActive) {
            checkAnswer();
        }

        document.getElementById("wordAnswer").value = "";
    }
});