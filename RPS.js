var pointsP1 = 0;
var pointsP2 = 0;

function move(btn) {
    var rndMove = generateMove();
    var result = compareMoves(btn, rndMove);
    var color;
    if (result == "WIN") {
        pointsP1++;
        color = "green";
    }
    else if (result == "LOSE") {
        pointsP2++;
        color = "red";
    }
    else {
        color = "orange";
    }
    document.getElementById("moves").innerHTML = stringifyMove(btn) + " - " + stringifyMove(rndMove);
    document.getElementById("result").style.color = color;
    document.getElementById("result").innerHTML = result;
    document.getElementById("points").innerHTML = pointsP1 + " - " + pointsP2;
    document.getElementById("btn").style = "display: block";
}

function generateMove() {
    var moves = ["r", "p", "s"];
    var rnd = Math.floor(Math.random() * 3);
    return moves[rnd];
}

function stringifyMove(btn) {
    var str = "";
    switch (btn) {
        case "r":
            str = "Rock";
            break;
        case "p":
            str = "Paper";
            break;
        case "s":
            str = "Scissors";
            break;
    }
    return str;
}

function compareMoves(move, pcMove) {
    var WL;
    if (move == "r" && pcMove == "s" || move == "p" && pcMove == "r" || move == "s" && pcMove == "p") {
        WL = "WIN";
    }
    else if (move == "r" && pcMove == "p" || move == "p" && pcMove == "s" || move == "s" && pcMove == "r") {
        WL = "LOSE";
    }
    else WL = "DRAW";

    return WL;
}

function reset() {
    pointsP1 = 0;
    pointsP2 = 0;
    document.getElementById("moves").innerHTML = "Make your move!";
    document.getElementById("result").innerHTML = "";
    document.getElementById("points").innerHTML = pointsP1 + " - " + pointsP2;
    document.getElementById("btn").style = "display: none";
}