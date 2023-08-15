/* Main variables */

const body = document.querySelector('body');
const mainHeading = document.querySelector('h1');
const canvas = document.querySelector('.canvas');

// Required numbers
let canvasPixelsAmount = 32;
let canvasSize, canvasPixelSize;
canvasSize = calculateCanvasSize();
canvasPixelSize = canvasSize / canvasPixelsAmount;

if (canvasSize < 420) mainHeading.style.fontSize = '200%'
else if (canvasSize > 800) mainHeading.style.fontSize = '400%'
else mainHeading.style.fontSize = '300%'

// Operation blocks
const defaultChoiceButton = document.querySelector('.default-color-btn');
const randomChoiceButton = document.querySelector('.random-color-btn');
const eraserButton = document.querySelector('.eraser-btn');
const resetButton = document.querySelector('.reset-btn');
const chooseSizeSlider = document.querySelector('.choose-size-slider');

// Text block shows canvas size for user
const chooseSizeOutput = document.querySelector('.choose-size-output');
chooseSizeOutput.textContent = `Size: ${canvasPixelsAmount}x${canvasPixelsAmount}`;

// Holds the user color choice, initially - default
let colorChoice = makeColorDefault;

// Shows if a user holds the mouse button down
let mouseDown;


/* Creates the initial canvas */
createCanvasPixels();


/* Event listeners */

// Buttons
defaultChoiceButton.addEventListener('click', () => colorChoice = makeColorDefault);
randomChoiceButton.addEventListener('click', () => colorChoice = makeColorRandom);
eraserButton.addEventListener('click', () => colorChoice = makeColorEraser);
resetButton.addEventListener('click', resetCanvas);

// Slider
chooseSizeSlider.addEventListener('input', (e) => {
  let amount = e.target.value;
  chooseSizeOutput.textContent = `Size: ${amount}x${amount}`;
});
chooseSizeSlider.addEventListener('change', (e) => {
  canvasPixelsAmount = e.target.value;
  canvas.innerHTML = '';
  canvasPixelSize = canvasSize / canvasPixelsAmount;
  createCanvasPixels();
});

// If click outside body then drawing stops
body.addEventListener('click', (e) => {
  if (e.target.className !== 'canvasPixel') mouseDown = false;
});

// Canvas pixels
canvas.addEventListener('mousedown', (e) => {
  mouseDown = (mouseDown === true) ? false : true;
  if (e.target.className === 'canvasPixel' && mouseDown === true) {
    e.target.style.backgroundColor = colorChoice();
  }
});
canvas.addEventListener('mouseover', (e) => {
  if (e.target.className === 'canvasPixel' && mouseDown === true) {
    e.target.style.backgroundColor = colorChoice();
  }
});

/* Functions */

// Return a color user chose: grey, random or erase
function makeColorDefault() {
  return 'gray';
}
function makeColorRandom() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}
function makeColorEraser() {
  return '#FFEFEB';
}

// Resets the canvas
function resetCanvas() {
  const canvasPixels = document.querySelectorAll('.canvas>div');
  canvasPixels.forEach((div) => div.style.backgroundColor = '#FFEFEB');
}

// Creates the grid inside of canvas
function createCanvasPixels() {
  for (let i = 0; i < canvasPixelsAmount * canvasPixelsAmount; i++) {
    let div = document.createElement('div');
    div.classList.add('canvasPixel');
    div.style.cssText = `height: ${canvasPixelSize}px; width: ${canvasPixelSize}px; background-color: #FFEFEB;`;
    canvas.append(div);
  }
}

// Calculates the size of the canvas, return it and assign as a CSS property
function calculateCanvasSize() {
  let size;
  if (window.innerWidth > window.innerHeight) {
    size = window.innerHeight * 0.8;
  } else {
    size = window.innerWidth * 0.8;
  }
  if (size > 1000) {
    size = 1000;
  }
  size = Math.floor(size / canvasPixelsAmount) * canvasPixelsAmount;

  canvas.style.width = `${size}px`;
  return size;
}