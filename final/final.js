//Global Variables 
const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');
const brushBtn = document.getElementById('brush');
const eraserBtn = document.getElementById('eraser');
const volumeDisplay = document.getElementById('volume');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'brush';
let currentColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

//Drawing the canvas
canvas.addEventListener('mousedown', (ev) => { //Mental note: I made "ev" short for event
   isDrawing = true;
   const rect = canvas.getBoundingClientRect();
   const scaleX = canvas.width / rect.width;
   const scaleY = canvas.height / rect.height;
   lastX = (ev.clientX - rect.left) * scaleX;
   lastY = (ev.clientY - rect.top) * scaleY;
});

//Color interval 
setInterval(() => {
    currentColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}, 1000);

//Drawing mechanics
canvas.addEventListener('mousemove', (ev) => {
  if (!isDrawing) return;
const rect = canvas.getBoundingClientRect();
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;
const x = (ev.clientX - rect.left) * scaleX;
const y = (ev.clientY - rect.top) * scaleY;

  if (currentTool === 'brush') {
    context.lineWidth = 3;
    context.lineCap = 'round'
 context.strokeStyle = currentColor;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
  } else {
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 40, 0, Math.PI * 2);
    context.fillStyle = 'gray';
    context.fill();
    context.globalCompositeOperation = 'source-over';
  }

  lastX = x;
  lastY = y;
  volumeDisplay.textContent = 'Volume:' + getVolume() + '%';
});


canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Brush
brush.addEventListener('click', () => {
  currentTool = 'brush';
});

// Eraser
eraser.addEventListener('click', () => {
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