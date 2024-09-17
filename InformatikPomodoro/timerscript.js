var timeLeft = 10;
var timeLearned = 0;
var timer = 0.5;
var slider = document.getElementById("timerBg");
let updateIntervalId;

time = 0;

function increaseTime() {
    time++;
}

setInterval(increaseTime, timer*60000);

function Start() {
    time = 0;
    slider.style.animation = "topToBottom " + timer*600 +"s linear 1 forwards";
    updateIntervalId = setInterval(Update, 10);  // Korrekte Variable benutzen
}

function Update() {
    timeLearned = time;
    timeLeft = timer - timeLearned;

    if (timeLeft <= 0) {
        slider.style.animation = "none";
        timeLeft = 0;  // Stelle sicher, dass timeLeft nicht negativ wird
        clearInterval(updateIntervalId);  // Stoppe den Timer
    }

    document.getElementById("timeLeft").innerHTML = timeLeft.toString() +"m";
    document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned + "m gelernt";
}
