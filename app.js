let gameSeq = [];  // Array to store the game's sequence
let userSeq = [];  // Array to store the user's input sequence

let btns = ['one', 'two', 'three', 'four'];  // Button IDs

let started = false;  // Game state
let level = 0;  // Current level

let highScore = 0;  // High score

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userSeq = [];  // Reset user sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);  // Get a random number between 0 and 3
    let randColor = btns[randIdx];  // Get a random button ID
    let randBtn = document.querySelector(`#${randColor}`);  // Select the button element

    gameSeq.push(randColor);  // Add the random button to the game sequence
    console.log(gameSeq);

    playSequence();  // Play the full sequence
}

function playSequence() {
    let delay = 0;  // Initial delay
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`#${color}`);
            btnFlash(btn);  // Flash each button in sequence
        }, delay);
        delay += 600;  // Increase delay to ensure each button flash is visible
    });
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);  // Move to the next level if user completes current sequence
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }
        h2.innerHTML = `Game Over! <b>Your Score is ${level}</b> <br>Press any key to restart.`;
        h3.innerHTML = `<b>High Score :-${highScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1500);
        reset();  // Reset the game if the user makes a mistake
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);  // Add user's button press to the user sequence

    checkAns(userSeq.length - 1);  // Check the user's input against the game sequence
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);  // Add event listener to each button
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
