let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const stop = document.querySelector('#stop');
const start = document.querySelector('#start');

function timer(seconds) {
	// clear any existing timers
	clearInterval(countdown);

	const now = Date.now(); // current time in milliseconds
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it!
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		// display it
        displayTimeLeft(secondsLeft);

        stop.addEventListener("click", function() {
			clearInterval(countdown);
		});
		start.addEventListener("click", function() {
			timer(secondsLeft);
		});
    }, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
	document.title = 'Timer ' + display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Have fun till ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
    timer(seconds);
    stop.classList.remove('hidden');    
    start.classList.remove('hidden');    
}
buttons.forEach(button => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});




