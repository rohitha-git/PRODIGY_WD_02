let startTime, updatedTime, difference;
let tInterval;
let running = false;
let lapCounter = 0;

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

function playPauseFunc() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        document.getElementById('play').innerHTML = '<i class="fa fa-pause"></i>';
        running = true;
    } else {
        clearInterval(tInterval);
        document.getElementById('play').innerHTML = '<i class="fa fa-play"></i>';
        running = false;
    }
}

function resetFunc() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    milliseconds.textContent = '00';
    document.getElementById('play').innerHTML = '<i class="fa fa-play"></i>';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function addLap() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((difference / (1000 * 60)) % 60);
    const secs = Math.floor((difference / 1000) % 60);
    const millis = Math.floor((difference % 1000) / 10);

    hours.textContent = ('0' + hrs).slice(-2);
    minutes.textContent = ('0' + mins).slice(-2);
    seconds.textContent = ('0' + secs).slice(-2);
    milliseconds.textContent = ('0' + millis).slice(-2);
}

function formatTime(time) {
    const hrs = Math.floor((time / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((time / (1000 * 60)) % 60);
    const secs = Math.floor((time / 1000) % 60);
    const millis = Math.floor((time % 1000) / 10);

    return (
        ('0' + hrs).slice(-2) + ':' +
        ('0' + mins).slice(-2) + ':' +
        ('0' + secs).slice(-2) + ':' +
        ('0' + millis).slice(-2)
    );
}
