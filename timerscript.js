var StartTime = 20;
var timeLeft = 10;
var timeLearned = 0;
var timerMin = 20;
var timerSec = timerMin*60;
var slider = document.getElementById("timerBg");
let updateIntervalId;
var running = false;

var controllerUP = false;

var breakOrPause = false;
var PauseTime = 5;

var PauseAudio = new Audio('Ping Sound 89718.mp3');
var StartAudio = new Audio('Ding Sound.mp3');

// Bottom Settings Bar
const footerDisplay = document.getElementById("footerDisplay");

time = 0;

function updateFooterDisplay() {
    footerDisplay.value = timerMin;
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
updateFooterDisplay();

function increaseTime() {
    time++;
}

setInterval(increaseTime, 1000);

function Start() {
    if(!running){
        if(breakOrPause){
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = PauseTime;
            timerSec = timerMin*60;
            updateFooterDisplay();
            slider.style.animation = "topToBottom " + timerSec +"s linear 1 reverse";
            updateIntervalId = setInterval(Update, 10);
        }else{
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = StartTime;
            timerSec = timerMin*60;
            slider.style.animation = "topToBottom " + timerSec +"s linear 1 forwards";
            updateIntervalId = setInterval(Update, 10);
        }
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
        if(breakOrPause){slider.style.height = "100vh"; StartAudio.play();}else{slider.style.height = "0vh"; PauseAudio.play();}
        timeLeft = 0;
        clearInterval(updateIntervalId);
        delay(100).then(() => Start());
        if(!breakOrPause){breakOrPause = true;}else{breakOrPause = false;}
    }

    if(timeLeft >= 60){
        timeLeft /= 60;
        timeLeft = Math.floor(timeLeft);
        document.getElementById("timeLeft").innerHTML = timeLeft.toString() +"m";
    }else{
        document.getElementById("timeLeft").innerHTML = timeLeft.toString() +"s";
    }

    if(timeLearned >= 60){
        if(!breakOrPause){
            timeLearned /= 60;
            timeLearned = Math.floor(timeLearned);
            document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned.toString() + "m gelernt";
        }else{
            timeLearned /= 60;
            timeLearned = Math.floor(timeLearned);
            document.getElementById("timeLearned").innerHTML = "Schon " + timeLearned.toString() + "m Pause";
        }

    }else{
        if(!breakOrPause){
            document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned.toString() + "s gelernt";
        }else{
            document.getElementById("timeLearned").innerHTML = "Schon " + timeLearned.toString() + "s Pause";
        }
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
        StartTime = timerMin;
        updateFooterDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function DecreaseTimer(){
    if(!running){
        timerMin -= 1;
        timerSec = timerMin*60;
        StartTime = timerMin;
        updateFooterDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function SetTimer(value){
    if(!running){
        timerMin = Number(value);
        timerSec = timerMin*60;
        StartTime = timerMin;
        updateFooterDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function StartTimer(lenght){
    if(running){
        alert("Du musst zuerst stoppen");
    }else{
        StartTime = lenght;
        timerMin = lenght;
        timerSec = timerMin*60;
        updateFooterDisplay();
        Start();
    }
}

goDown();