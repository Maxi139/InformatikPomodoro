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
    console.log(PauseTime)
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
    console.log(PauseTime)
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
    console.log(PauseTime)
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
    console.log(number)
    console.log(Themes[number])

    let splitTheme = Themes[number].split("---")
    console.log(splitTheme)

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