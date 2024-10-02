const body = document.querySelector('body');
const game = document.querySelector(".game");
const count = document.querySelector("h1");
const reset = document.querySelector("#reset");
const ash = document.querySelector("#ash");
const audio = document.getElementById("gameAudio"); 
const volumeIcon = document.getElementById("volumeIcon");
let isMuted = false;

body.addEventListener('click', () => {
    audio.play().catch(error => {
        console.log("Erro ao tentar tocar o áudio:", error);
    });
});

let position = { top: 0, left: 0 }; // Posição inicial de Ash
const step = 10;

const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;

body.addEventListener("keydown", (event) => {
    event.stopPropagation();

    switch (event.code) {
        case 'ArrowLeft':
            if (position.left > 0) {
                position.left -= step;
                ash.src = "assets/left.png";
            }
            break;

        case 'ArrowRight':
            if (position.left < gameWidth - ash.clientWidth) {
                position.left += step;
                ash.src = "assets/right.png";
            }
            break;

        case 'ArrowDown':
            if (position.top < gameHeight - ash.clientHeight) {
                position.top += step;
                ash.src = "assets/front.png";
            }
            break;

        case 'ArrowUp':
            if (position.top > 0) {
                position.top -= step;
                ash.src = "assets/back.png";
            }
            break;

        case 'Space': // Tecla para tocar ou pausar o áudio
            if (audio.paused) {
                audio.play(); // Toca o áudio se estiver pausado
            } else {
                audio.pause(); // Pausa o áudio se estiver tocando
            }
            break;

        default:
            break;
    }

    // Atualiza a posição de Ash
    ash.style.left = `${position.left}px`;
    ash.style.top = `${position.top}px`;
});

// Contagem regressiva
let countdown = 60; // Contagem inicial
const countdownDisplay = document.querySelector("h1");

const startCountdown = () => {
    const interval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            alert("Tempo esgotado!");
        }
    }, 1000);
};

startCountdown();

// Controle de volume
volumeIcon.addEventListener("click", () => {
    if (isMuted) {
        audio.volume = 1;
        volumeIcon.src = "assets/icons/on.png";
    } else {
        audio.volume = 0;
        volumeIcon.src = "assets/icons/off.png";
    }
    isMuted = !isMuted; // Alterna o estado
});
