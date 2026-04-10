//Drawing the canvas
const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

const brushBtn = document.getElementById('brushBtn');
const eraserBtn = document.getElementById('eraserBtn');
const volumeDisplay = document.getElementById('volumeDisplay');


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'brush';

canvas.addEventListener('mousedown', (ev) => { //Mental note: I made "ev" short for event
   isDrawing = true;
   lastX = ev.offsetX;
   lastY = ev.offsetY;
});

canvas.addEventListener('mousemove', (ev) => {
  if (!isDrawing) return;

  if (currentTool === 'brush') {
    context.lineWidth = 3;
    context.lineCap = 'round'
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(ev.offsetX, ev.offsetY);
    context.stroke();
  } else {
    context.beginPath();
    context.arc(ev.offsetX, ev.offsetY, 40, 0, Math.PI * 2);
    context.fillStyle = 'gray';
    context.fill();
  }

  lastX = ev.offsetX;
  lastY = ev.offsetY;

  volumeDisplay.textContent = 'Volume:' + getVolume() + '%';
});


canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Brush
brushBtn.addEventListener('click', () => {
  currentTool = 'brush';
});

// Eraser
eraserBtn.addEventListener('click', () => {
  currentTool = 'eraser';
});

//Measuring how much of the canvas is colored
function getVolume() {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let paintedCount = 0;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] > 0) paintedCount++;
  }
  return Math.round((paintedCount / (canvas.width * canvas.height)) * 100);
}