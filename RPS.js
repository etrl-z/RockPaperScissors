const moves = ["r", "p", "s"];
const toWin = 5;
var pointsP1 = 0;
var pointsP2 = 0;
var scoring = "";
var color = "";
var enableMove = true;
let confettiInterval;

function move(myMove) {
    if (!enableMove)
        return;

    var rndMove = generateMove();
    var result = compareMoves(myMove, rndMove);

    if (result == 1) {
        pointsP1++;
        scoring = "HUMAN";
        color = "green";
    }
    else if (result == 2) {
        pointsP2++;
        scoring = "COMPUTER";
        color = "red";
    }
    else{
        color = "orange";
    }

    changeImg(document.getElementById("screen-1-move"), myMove);
    changeImg(document.getElementById("screen-2-move"), rndMove);

    document.getElementById("points").innerHTML = pointsP1 + " - " + pointsP2;
    document.getElementById("btn").style = "display: block";

    if (pointsP1 == toWin || pointsP2 == toWin) {
        document.getElementById("message").innerHTML = scoring + " WINS!";
        document.getElementById("message").style.color = color;

        enableMove = false;
        if (pointsP1 == toWin) {
            confettiInterval = setInterval(createConfetti, 5);
        }
    }
    else {
        document.getElementById("message").innerHTML = result == 0 ? "DRAW!" : scoring + " SCORES!";
        document.getElementById("message").style.color = color;
    }
}

function generateMove() {
    var rnd = Math.floor(Math.random() * 3);
    return moves[rnd];
}

function changeImg(image, move) {
    image.style.transform = "scale(0.01)";
    setTimeout(() => {
        image.src = getImgFromMove(move);
        image.style.transform = "scale(0.5)";
    }, 100);
}

function getImgFromMove(move) {
    var src = "";
    switch (move) {
        case "r":
            src = "images/rock.jpg";
            break;
        case "p":
            src = "images/paper.jpg";
            break;
        case "s":
            src = "images/scissors.jpg";
            break;
    }
    return src;
}

function compareMoves(myMove, pcMove) {
    var winner = 0;
    if (myMove == "r" && pcMove == "s" || myMove == "p" && pcMove == "r" || myMove == "s" && pcMove == "p") {
        winner = 1;
    }
    else if (myMove == "r" && pcMove == "p" || myMove == "p" && pcMove == "s" || myMove == "s" && pcMove == "r") {
        winner = 2;
    }

    return winner;
}

function reset() {
    pointsP1 = 0;
    pointsP2 = 0;
    enableMove = true;
    document.getElementById("screen-1-move").src = "";
    document.getElementById("screen-2-move").src = "";
    document.getElementById("message").innerHTML = "MAKE YOUR MOVE";
    document.getElementById("message").style.color = "black";
    document.getElementById("points").innerHTML = pointsP1 + " - " + pointsP2;
    document.getElementById("btn").style = "display: none";

    stopConfetti();
}

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);

    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";

    const animationDuration = Math.random() * 3 + 2;
    confetti.style.transition = `transform ${animationDuration}s linear, opacity ${animationDuration}s ease-in`;

    requestAnimationFrame(() => {
        confetti.style.transform = `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = 0;
    });

    setTimeout(() => {
        confetti.remove();
    }, animationDuration * 1000);

}

function stopConfetti() {
    clearInterval(confettiInterval);
}

