const minuteDurationInSeconds = 60;
var time,
    timerClear = true,
    mode = "work",
    isWorking,
    counterInterval,
    timeToGo;

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
        document.getElementById("workButton").innerHTML="start";
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
        document.getElementById("workButton").innerHTML="start";
        pause();
    } else {
        isWorking = true;
        document.getElementById("workButton").innerHTML="stop";
        //if (timerClear) {
            timerClear = false;
        //}
        countdown();
    }
}

function work() {
    mode = "work";
    reset();
}

function rest() {
    mode = "rest";
    reset();
}

function increment() {
    let addOne = document.getElementById("workTime").innerHTML;
    addOne++;
    document.getElementById("workTime").innerHTML=addOne;
}

function decrement() {

}