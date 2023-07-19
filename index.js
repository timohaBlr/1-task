const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let timer;
const createTimerAnimator = () => {
        return (seconds) => {
            if (!seconds) {
                timerEl.innerText = 'Введите выше количество секунд.';
                return
            }

            timeToDisplay(seconds);
            seconds--;

            timer = setInterval(() => {
                timeToDisplay(seconds);
                seconds--;
            }, 1000)

        };
    }
;

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    const target = e.target
    target.classList.remove("input-error");
    target.setCustomValidity("");
    if (!inputFilter(target.value)) {
        target.value = target.value.slice(0, -1)
        target.classList.add("input-error");
        target.setCustomValidity('Только числа');
        target.reportValidity();
    }
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    clearInterval(timer);
    animateTimer(seconds);
    inputEl.value = '';
});

const timeToDisplay = (seconds) => {
    if (seconds === 0) {
        timerEl.innerText = 'Время вышло!';
        clearInterval(timer)
        return
    }
    const hours = addZero(Math.floor(seconds / 3600));
    const minutes = addZero(Math.floor((seconds - hours * 3600) / 60));
    const pureSeconds = addZero(seconds - hours * 3600 - minutes * 60);

    timerEl.innerText = `${hours}:${minutes}:${pureSeconds}`;
}
const inputFilter = function (value) {
    return /^-?\d*$/.test(value);
}
const addZero = (number) => {
    if (number < 10) {
        number = '0' + number
    }
    return number
}

