var timeLeft = 10;
var timeLearned = 0;
var timer = 10;
var refreshIntervallId;

slider = document.getElementById("timerBg");

var height = window.innerHeight / timer * timeLeft;
slider.style.height = height + "px";

function decreaseTime() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLearned++;
        height = window.innerHeight / timer * timeLeft;
        slider.style.height = height + "px";
        document.getElementById("timeLeft").innerHTML = timeLeft + ":00";
        document.getElementById("timeLearned").innerHTML = "Du hast schon " + timeLearned + ":00 gelernt";
    } else if (timeLeft == 0) {
        Pause();
    }

    if(height <= (window.innerHeight / 10) * 9) {
        document.getElementsByClassName("settingsIcon")[0].classList.add("lowEnough");
    } else {
        document.getElementsByClassName("settingsIcon")[0].classList.remove("lowEnough");
    }
    if (height <= window.innerHeight / 3) {
        document.getElementById("timeLeft").classList.add("lowEnough");
        document.getElementById("timeLearned").classList.add("lowEnough");

        // Loop through elements with class name 'img' and add class
        var imgElements = document.getElementsByClassName("img");
        for (var i = 0; i < imgElements.length; i++) {
            imgElements[i].classList.add("lowEnough");
        }
    } else {
        document.getElementById("timeLeft").classList.remove("lowEnough");
        document.getElementById("timeLearned").classList.remove("lowEnough");

        // Loop through elements with class name 'img' and remove class
        var imgElements = document.getElementsByClassName("img");
        for (var i = 0; i < imgElements.length; i++) {
            imgElements[i].classList.remove("lowEnough");
        }
    }
}

function Play() {
    document.getElementById("pause").classList.toggle("active");
    document.getElementById("play").classList.toggle("active");

    refreshIntervallId = setInterval(decreaseTime, 1000); // Set the interval and assign it to the broader variable
}

function Pause() {
    document.getElementById("pause").classList.toggle("active");
    document.getElementById("play").classList.toggle("active");

    clearInterval(refreshIntervallId); // Clear the interval using the broader scoped variable
}
