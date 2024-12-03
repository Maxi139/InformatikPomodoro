var StartTime = 20;
var timeLeft = 10;
var timeLearned = 0;
var timerMin = 20;
var timerSec = timerMin*60;
var slider = document.getElementById("timerBg");
let updateIntervalId;
var running = false;

var Paused = false;

var controllerUP = false;

var breakOrPause = false;
var PauseTime = 5;

var PauseAudio = new Audio('Ping Sound 89718.mp3');
var StartAudio = new Audio('Ding Sound.mp3');

var timeLeftSec = 0;

const Themes = ["#EEEEEE---#FF4A4A---#C4FF93---#121212---#EEEEEE76", "#F4ECD6---#62466B---#8C93A8---#F4ECD6---#F4ECD676", "#EEE---#558B6E---#06D6A0---#EEE---#EEEEEE76", "#EEE---#F79256---#FBD1A2---#EEE---#EEEEEE76", "#EEE---#3C91E6---#B8F2E6---#EEE---#EEEEEE76", "#EEE---#190B28---#685762---#FFE9CE---#EEEEEE46"];

time = 0;

function updateFooterDisplay() {
    document.getElementById("SetTimer").value = timerMin;
    document.getElementById("SetPause").value = PauseTime;
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
    if(controllerUP){toggleSettings();}
    if(!running && !Paused){
        if(breakOrPause){
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = PauseTime;
            timerSec = timerMin*60;
            updateFooterDisplay();
            updateIntervalId = setInterval(Update, 10);
        }else{
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = StartTime;
            timerSec = timerMin*60;
            updateIntervalId = setInterval(Update, 10);
        }
    }
    else if(!running && Paused){
        Paused = false;
        if(breakOrPause){
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = PauseTime;
            timerSec = timerMin*60;
            updateFooterDisplay();
            updateIntervalId = setInterval(Update, 10);
        }else{
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "läuft...";
            time = 0;
            timerMin = StartTime;
            timerSec = timerMin*60;
            updateIntervalId = setInterval(Update, 10);
        }
    }
}

function Update() {
    if(!Paused){
        timeLearned = time;
        timeLeft = timerSec - timeLearned;
        
        if(breakOrPause){
            let remainingPercentage = 100-(timeLeft / timerSec * 100);
            slider.style.height = (remainingPercentage / 100) * window.innerHeight + "px";
        }else{
            let remainingPercentage = timeLeft / timerSec * 100;
            slider.style.height = (remainingPercentage / 100) * window.innerHeight + "px";
        }
        

        if (timeLeft <= 0) {
            running = !running;
            document.getElementById("startBtn").classList.toggle("running");
            document.getElementById("startBtn").innerHTML = "Start";
            
            if(breakOrPause){
                slider.style.height = "100%";
                StartAudio.play();
                document.getElementById("overlay").style.animation = "overlayAnimation 1s";
                setTimeout(() => document.getElementById("overlay").style.animation = "none", 1000);
            }else{
                slider.style.height = "0%";
                PauseAudio.play();
                document.getElementById("overlay").style.animation = "overlayAnimation 1s";
                setTimeout(() => document.getElementById("overlay").style.animation = "none", 1000);
            }
            timeLeft = 0;
            clearInterval(updateIntervalId);
            delay(100).then(() => Start());
            if(!breakOrPause){breakOrPause = true;}else{breakOrPause = false;}
        }

        timeLeftMin = timeLeft / 60;
        timeLeftMin = Math.floor(timeLeftMin);
        timeLeftSec = timeLeft - (timeLeftMin * 60);

        if(timeLeftSec.toString().length == 1){
            timeLeftSec = "0" + timeLeftSec;
        }
        if(timeLeftMin.toString().length == 1){
            timeLeftMin = "0" + timeLeftMin;
        }
        document.getElementById("timeLeft").innerHTML = timeLeftMin.toString() + ":" + timeLeftSec.toString();

    }
}

function updateTimerDisplay(){
    document.getElementById("timeLeft").innerHTML = timerMin.toString() + ":00";
}

function IncreaseTimer(whichOne){
    if(!running){
        if(whichOne == 1){
            timerMin += 5;
            timerSec = timerMin*60;
            StartTime = timerMin;
        }else{
            PauseTime += 1;
            StartTime = timerMin;
        }

        updateFooterDisplay();
        updateTimerDisplay();
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function DecreaseTimer(whichOne){
    if(!running){
        if(timerMin - 1 > 0){
            if(whichOne == 1){
                timerMin -= 1;
                timerSec = timerMin*60;
                StartTime = timerMin;
            }else{
                PauseTime -= 1;
                StartTime = timerMin;
            }
            updateFooterDisplay();
            updateTimerDisplay();
        }else{
            alert("Der Timer kann nicht ins Minus gehen oder 0 sein");
        }
    }else{
        alert("Du musst zuerst stoppen");
    }
}

function SetTimer(value, whichOne){
    if(!running){
        if(Number(value) > 0){
            if(whichOne == 1){
                timerMin = Number(value);
                timerSec = timerMin*60;
                StartTime = timerMin;
            }else{
                PauseTime = Number(value);
                StartTime = timerMin;
            }
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


function ChangeTheme(number = 0){

    let splitTheme = Themes[number].split("---")

    document.documentElement.style.setProperty('--firstColor', splitTheme[0]);
    document.documentElement.style.setProperty('--secondColor', splitTheme[1]);
    document.documentElement.style.setProperty('--thirdColor', splitTheme[2]);
    document.documentElement.style.setProperty('--fourthColor', splitTheme[3]);
    document.documentElement.style.setProperty('--fiftColor', splitTheme[4]);

    localStorage.setItem("theme", number)
}


if(localStorage.getItem("theme")){
    ChangeTheme(localStorage.getItem("theme"))
}else{
    ChangeTheme(0)
}

function setAudioVolume(number){
    PauseAudio.volume = number/100;
    StartAudio.volume = number/100;
}

volumeSlider.value = 50;
setAudioVolume(50);