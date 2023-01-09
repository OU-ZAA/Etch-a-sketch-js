DEFAULT_MODE = "color";
DEFAULT_SIZE = 16;
DEFAULT_COLOR = "#131313";

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

const gridContainer = document.querySelector(".container");
const colorPicker = document.querySelector("#color");
const colorBtn = document.querySelector("#color-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const gridSizeBtn = document.querySelector("#grid-size");

// Check if the mouse is down
let mouseDown = false;
document.body.onmousedown = (() => mouseDown = true);
document.body.onmouseup = (() => mouseDown = false);

document.addEventListener("DOMContentLoaded", () => setupGrid(currentSize))
colorPicker.addEventListener("change", () => setNewColor(colorPicker.value));
colorBtn.addEventListener("click", () => setNewMode("color"));
rainbowBtn.addEventListener("click", () => setNewMode("rainbow"));
eraser.addEventListener("click", () => setNewMode("erase"));
clearBtn.addEventListener("click", () => {
    clearGrid();
    setupGrid(currentSize);
})
gridSizeBtn.addEventListener("change", () => {
    setNewSize(gridSizeBtn.value);
    clearGrid();
    setupGrid(currentSize);
});

function setupGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridDiv = document.createElement("div");
        gridDiv.classList.add("grid");
        gridContainer.appendChild(gridDiv);
        gridDiv.addEventListener("mousedown", changeColor);
        gridDiv.addEventListener("mouseover", changeColor);
    }
}

function clearGrid() {
    gridContainer.innerHTML = "";
}

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (currentMode === "erase") {
        e.target.style.backgroundColor = "#949494";
    } else if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "rainbow") {
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen = Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    }
}

function setNewColor(newColor) {
    currentColor = newColor;
}

function setNewSize(newSize) {
    currentSize = newSize;
}

function setNewMode(newMode) {
    currentMode = newMode;
}

