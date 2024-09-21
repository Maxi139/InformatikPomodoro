var timeLeft = 10;
var timeLearned = 0;
var timerMin = 20;
var timerSec = timerMin*60;
var slider = document.getElementById("timerBg");
let updateIntervalId;
var running = false;
var controllerUP = true;

// Bottom Settings Bar
const footerDisplay = document.getElementById("footerDisplay");

time = 0;

function updateFooterDisplay() {
    footerDisplay.value = timerMin;
}

updateFooterDisplay();

function increaseTime() {
    time++;
}

setInterval(increaseTime, 1000);

function Start() {
    if(!running){
        running = !running;
        document.getElementById("startBtn").classList.toggle("running");
        document.getElementById("startBtn").innerHTML = "läuft...";
        time = 0;
        slider.style.animation = "topToBottom " + timerSec +"s linear 1 forwards";
        updateIntervalId = setInterval(Update, 10);
    }
}

function Update() {
    timeLearned = time;
    timeLeft = timerSec - timeLearned;

    if (timeLeft <= 0) {
        running = !running;
        document.getElementById("startBtn").classList.toggle("running");
        document.getElementById("startBtn").innerHTML = "Start";
        slider.style.animation = "none";
        timeLeft = 0;
        clearInterval(updateIntervalId);
    }

    if(timeLeft >= 60){
        timeLeft /= 60;
        timeLeft = Math.floor(timeLeft);
        document.getElementById("timeLeft").innerHTML = timeLeft.toString() +"m";
    }else{
        document.getElementById("timeLeft").innerHTML = timeLeft.toString() +"s";
    }

    if(timeLearned >= 60){
        timeLearned /= 60;
        timeLearned = Math.floor(timeLearned);
        document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned.toString() + "m gelernt";
    }else{
        document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned + "s gelernt";
    }

}


// Bottom Settings Bar
function goDown() {
    controllerUP = false;
    document.getElementsByClassName("goDown")[0].classList.toggle("down");
    document.getElementsByClassName("controller")[0].style.bottom = "calc((100% - 2vw)*-1)";
}

function goUp() {
    controllerUP = true;
    document.getElementsByClassName("goDown")[0].classList.toggle("down");
    document.getElementsByClassName("controller")[0].style.bottom = "0";
}

function toggleSettings() {
    if (controllerUP) {
        goDown();
    } else {
        goUp();
    }
}

function IncreaseTimer(){
    if(!running){
        timerMin += 5;
        timerSec = timerMin*60;
        updateFooterDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function DecreaseTimer(){
    if(!running){
        timerMin -= 1;
        timerSec = timerMin*60;
        updateFooterDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}