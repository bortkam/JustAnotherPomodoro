var time,
	isTimerClear = true,
	mode = "work",
	isWorking = false,
	counterInterval,
	timeToGo;
	audio = new Audio('media/sounds/analog-alarm-clock.wav');

window.addEventListener('beforeunload', function (e) {
	if (isWorking) {
		// display alert when exiting website while clock is counting
		e.preventDefault();
		e.returnValue = '';
	}
});

function getTimeInSeconds() {
	// gets time in minutes from settings panel, and returns it as seconds
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

function displayTime() {
	let timeInMinutes = document.getElementById("pomodoroTimer").innerHTML
		= changeTimeFormat(timeToGo);
	document.title = timeInMinutes+" | "+mode;
}

function countdown() {
	counterInterval = setInterval(() => {
		timeToGo--;
		displayTime();
		if (timeToGo != 0) {
			return 0;
		}
		audio.play();
		clearInterval(counterInterval);
		if (mode === "work") {
			rest();
		} else {
			work();
		}
		start();
	}, 1000);
}

function pause() {
	clearInterval(counterInterval);
}

function reset() {
	if (!isTimerClear) {
		pause();
		document.getElementById("startButtonImage").src =
			"media/images/icons/play_arrow.svg"
		document.title = "JustAnotherPomodoro";
	}
	isWorking = false;
		
	if (mode === "work") {
		document.getElementById("pomodoroTimer").innerHTML = 
			changeTimeFormat(getTimeInSeconds());
	} else {
		document.getElementById("pomodoroTimer").innerHTML = 
			changeTimeFormat(getTimeInSeconds());
	}
	isTimerClear = true;
}

function start() {
	if (isTimerClear === true) {
		timeToGo = getTimeInSeconds();
	}

	if (isWorking) {
		isWorking = false;
		document.getElementById("startButtonImage").src = 
			"media/images/icons/play_arrow.svg";
		pause();
	} else {
		isWorking = true;
		document.getElementById("startButtonImage").src = 
			"media/images/icons/pause.svg";
		isTimerClear = false;
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
	document.getElementById(whatToIncrementDecrement).innerHTML = numberToChange;
	if (!isWorking) {
		reset();
	}
}

function buttonsInSettings(clickedButtonID) {
	switch (clickedButtonID) {
		case 'incrementWork':
			IncrementDecrement(document.getElementById("workTime").id,"increment");
			break;
		case 'decrementWork':
			IncrementDecrement(document.getElementById("workTime").id,"decrement");
			break;
		case 'incrementRest':
			IncrementDecrement(document.getElementById("restTime").id,"increment");
			break;
		case 'decrementRest':
			IncrementDecrement(document.getElementById("restTime").id,"decrement");
			break;
	}
}