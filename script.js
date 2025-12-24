const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let isOn = false;
let history = [];
let lastAnswer = "";

function setButtons(state) {
    buttons.forEach(btn => {
        if (!btn.classList.contains("on") && !btn.classList.contains("off")) {
            btn.disabled = !state;
        }
    });
}

setButtons(false);

function powerOn() {
    isOn = true;
    setButtons(true);
    display.value = "ON";
    setTimeout(() => display.value = "", 600);
}

function powerOff() {
    isOn = false;
    setButtons(false);
    display.value = "OFF";
    setTimeout(() => display.value = "", 600);
}

function add(value) {
    if (!isOn) return;
    display.value += value;
}

function clearDisplay() {
    if (isOn) display.value = "";
}

function allClear() {
    if (!isOn) return;
    display.value = "";
    history = [];
    lastAnswer = "";
}

function backspace() {
    if (isOn) display.value = display.value.slice(0, -1);
}

function compute() {
    if (!isOn) return;
    try {
        const expr = display.value;
        const result = eval(expr);
        history.push(expr + " = " + result);
        lastAnswer = result;
        display.value = result;
    } catch {
        display.value = "ERROR";
    }
}

function showHistory() {
    if (!isOn) return;
    display.value = history.length ? history.join(" | ") : "NO HISTORY";
}

function useAns() {
    if (isOn && lastAnswer !== "") {
        display.value += lastAnswer;
    }
}

/* Keyboard Support */
document.addEventListener("keydown", e => {
    if (!isOn) return;
    const allowed = "0123456789+-*/().";
    if (allowed.includes(e.key)) add(e.key);
    else if (e.key === "Enter") compute();
    else if (e.key === "Backspace") backspace();
    else if (e.key === "Escape") clearDisplay();
});
