const minuteDurationInSeconds = 60;
var time,
    timerClear = true,
    mode = "work",
    isWorking = false,
    counterInterval,
    timeToGo;

document.getElementById("workButton").style.backgroundColor = "#cfcfcf";

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});

function getTimeInSeconds() {
    if (mode === "work") {
        return parseInt(document.getElementById("workTime").innerHTML)*60;
    }
    return parseInt(document.getElementById("restTime").innerHTML)*60;
}

function changeTimeFormat(timeInSeconds) { 
    // receieves time in ss format and returns in mm:ss format
    let minutes = Math.floor(timeInSeconds / 60);
    let extraSeconds = timeInSeconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return minutes+":"+extraSeconds;
}

function countdown() {
    counterInterval = setInterval(() => {
        timeToGo--;
        document.getElementById("pomodoro").innerHTML=changeTimeFormat(timeToGo);
        if (timeToGo == 0) {
            clearInterval(counterInterval);
            if (mode === "work") {
                rest();
            } else {
                work();
            }
            start();
        }
    }, 1000);
}

function pause() {
    clearInterval(counterInterval);
}

function reset() {
    if (isWorking) {
        clearInterval(counterInterval);
        document.getElementById("startButton").innerHTML="<img src=\"media/images/play_arrow.svg\" alt=\"start\">";
    }
    isWorking = false;
    
    if (mode === "work") {
        document.getElementById("pomodoro").innerHTML=changeTimeFormat(getTimeInSeconds());
    } else {
        document.getElementById("pomodoro").innerHTML=changeTimeFormat(getTimeInSeconds());
    }
    timerClear = true;
}

function start() {
    if (timerClear === true) {
        timeToGo = getTimeInSeconds();
    }

    if (isWorking) {
        isWorking = false;
        document.getElementById("startButton").innerHTML="<img src=\"media/images/play_arrow.svg\" alt=\"start\">";
        pause();
    } else {
        isWorking = true;
        document.getElementById("startButton").innerHTML="<img src=\"media/images/pause.svg\" alt=\"stop\">";
        //if (timerClear) {
            timerClear = false;
        //}
        countdown();
    }
}

function work() {
    if (mode !== "work") {
        mode = "work";
        document.getElementById("workButton").style.backgroundColor = "#cfcfcf";
        document.getElementById("restButton").style.backgroundColor = "#fafafa";
        reset();
    } 
}

function rest() {
    if (mode !== "rest") {
        mode = "rest";
        document.getElementById("workButton").style.backgroundColor = "#fafafa";
        document.getElementById("restButton").style.backgroundColor = "#cfcfcf";
        reset();
    }
}

function IncrementDecrement(whatToIncrementDecrement, incrementOrDecrement) {
    let numberToChange;

    if (whatToIncrementDecrement === "workTime") {
        numberToChange = parseInt(document.getElementById("workTime").innerHTML);
    } else {
        numberToChange = parseInt(document.getElementById("restTime").innerHTML);
    }

    if (incrementOrDecrement === "increment") {
        if (numberToChange <= 58) {
            numberToChange++;
        }
    } else {
        if (numberToChange >= 2) {
            numberToChange--;
        }
    }
    document.getElementById(whatToIncrementDecrement).innerHTML=numberToChange;
    if (isWorking === false) {
        reset();
    }
}

function incrementWork() {
    const whatToIncrementDecrement = document.getElementById("workTime").id;
    IncrementDecrement(whatToIncrementDecrement,"increment");
}

function decrementWork() {
    const whatToIncrementDecrement = document.getElementById("workTime").id;
    IncrementDecrement(whatToIncrementDecrement,"decrement");
}

function incrementRest() {
    const whatToIncrementDecrement = document.getElementById("restTime").id;
    IncrementDecrement(whatToIncrementDecrement,"increment");
}

function decrementRest() {
    const whatToIncrementDecrement = document.getElementById("restTime").id;
    IncrementDecrement(whatToIncrementDecrement,"decrement");
}