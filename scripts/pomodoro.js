var time,
	isTimerClear = true,
	isWorking = false,
	mode = "work",
	counterInterval,
	timeToGo;
	workTime;
	restTime;
	audio = new Audio('media/sounds/analog-alarm-clock.wav');
	
function setCookie() {
	document.cookie = "workTime=25";
  document.cookie = "restTime=5";
}

function updateCookie() {
	document.cookie = "workTime="+workTime;
  document.cookie = "restTime="+restTime;
}

function checkCookie() {
	if (document.cookie.length === 0) {
		//alert("This site is using cookies to store information. Clicking the button in this notification is consent to save cookies on the device");
		setCookie();
	}
} 

function getCookie(name) {
	let cookieArr;
	cookieArr = document.cookie.split(";");
		for(let i = 0; i < cookieArr.length; i++) {
		let cookieVariable;
		cookieArr[i] = cookieArr[i].replace(/ /g,'');
		let equalSymbolIndex = cookieArr[i].indexOf("=");
		let cookieName = cookieArr[i].slice(0,equalSymbolIndex);
		if (cookieName === name) {
			cookieVariable = cookieArr[i].slice(equalSymbolIndex+1,);
			return cookieVariable;
		}
	}
}

function initializeValuesFromCookies() {
	checkCookie();
	workTime = getCookie("workTime");
	restTime = getCookie("restTime");
	document.getElementById("workTime").innerHTML = workTime;
	document.getElementById("restTime").innerHTML = restTime;
}

function getTimeInSeconds() {
	// gets time in minutes from settings panel, and returns it as seconds
	if (mode === "work") {
		return workTime*60;
	}
	return restTime*60;
}

function changeTimeFormat(timeInSeconds) { 
	// receieves time in ss format and returns in mm:ss format
	let minutes = Math.floor(timeInSeconds / 60);
	let extraSeconds = timeInSeconds % 60;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
	return minutes+":"+extraSeconds;
}

function initializeTime() {
	let time = getTimeInSeconds(workTime);
	document.getElementById("pomodoroTimer").innerHTML
		= changeTimeFormat(time);
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
	if (isTimerClear) {
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

/*
function incrementDecrement(whatToIncrementDecrement, incrementOrDecrement) {
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
*/

//TODO: GET RID OF THIS MONSTROSITY!
function buttonsInSettings(clickedButtonID) {
	switch (clickedButtonID) {
		case 'incrementWork':
			if (workTime > 58) {
				return 0;
			}
			workTime++;
			document.getElementById("workTime").innerHTML = workTime;
			if (!isWorking) {
				reset();
			}
			break;
		case 'decrementWork':
			if (workTime < 2) {
				return 0;
			}
			workTime--;
			document.getElementById("workTime").innerHTML = workTime;
			if (!isWorking) {
				reset();
			}
			break;
		case 'incrementRest':
			if (restTime > 58) {
				return 0;
			}
			restTime++;
			document.getElementById("restTime").innerHTML = restTime;
			if (!isWorking) {
				reset();
			}
			break;
		case 'decrementRest':
			if (restTime < 2) {
				return 0;
			}
			restTime--;
			document.getElementById("restTime").innerHTML = restTime;
			if (!isWorking) {
				reset();
			}
			break;
	}
}

function initializeApp() {
	randomizeWallpaper()
	initializeValuesFromCookies();
	initializeTime();
}