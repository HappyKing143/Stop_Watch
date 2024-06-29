let display = document.getElementById("display");
let startStopButton = document.getElementById("startStop");
let resetButton = document.getElementById("reset");

let timer;
let isRunning = false;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

function updateDisplay() {
  let h = hours < 10 ? `0${hours}` : hours;
  let m = minutes < 10 ? `0${minutes}` : minutes;
  let s = seconds < 10 ? `0${seconds}` : seconds;
  let ms =
    milliseconds < 100
      ? milliseconds < 10
        ? `00${milliseconds}`
        : `0${milliseconds}`
      : milliseconds;
  display.textContent = `${h}:${m}:${s}:${ms}`;
}

function startTimer() {
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

startStopButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    startStopButton.textContent = "Start";
  } else {
    startTimer();
    startStopButton.textContent = "Stop";
  }
  isRunning = !isRunning;
});

resetButton.addEventListener("click", () => {
  stopTimer();
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  startStopButton.textContent = "Start";
  isRunning = false;
});

// Initialize display
updateDisplay();
