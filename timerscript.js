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

var timeLeftSec = 0;

//Modes
var dark = false;

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
    if(dark == true){
        document.getElementById("mode1").style.visibility = "visible";
        document.getElementById("mode1").style.animation = "fade-out 0.5s linear 1 forwards";
    }
    if(controllerUP){toggleSettings();}
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

    if(timeLeft <= 10){
        console.log("10 Sekunden verbleibend");
        if(dark == true){
            console.log("10 Sekunden verbleibend + true");
            document.getElementById("mode1").style.visibility = "visible";
            document.getElementById("mode1").style.animation =  "fadeOut 10s reverse forwards";
        }
    }

    timeLeftMin = timeLeft / 60;
    timeLeftMin = Math.floor(timeLeftMin);
    timeLeftSec = timeLeft-(timeLeftMin*60);

    if(timeLeftSec.toString().length == 1){
        timeLeftSec = "0" + timeLeftSec;
    }
    if(timeLeftMin.toString().length == 1){
        timeLeftMin = "0" + timeLeftMin;
    }
    document.getElementById("timeLeft").innerHTML = timeLeftMin.toString() +":"+ timeLeftSec.toString();

}

function updateTimerDisplay(){
    document.getElementById("timeLeft").innerHTML = timerMin.toString() + ":00";
}

function IncreaseTimer(){
    if(!running){
        timerMin += 5;
        timerSec = timerMin*60;
        StartTime = timerMin;
        updateFooterDisplay();
        updateTimerDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function DecreaseTimer(){
    if(!running){
        if(timerMin - 1 > 0){
            timerMin -= 1;
            timerSec = timerMin*60;
            StartTime = timerMin;
            updateFooterDisplay();
            updateTimerDisplay();
        }else{
            alert("Der Timer kann nicht ins Minus gehen oder 0 sein");
        }
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function SetTimer(value){
    if(!running){
        if(Number(value) > 0){
            timerMin = Number(value);
            timerSec = timerMin*60;
            StartTime = timerMin;
            updateFooterDisplay();
            updateTimerDisplay();
        }else{
            alert("Der Timer kann nicht ins Minus gehen oder 0 sein");
        }
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

function toggleModes(){
    dark = !dark;
    console.log("Modus: " + dark.toString());
}
