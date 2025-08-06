const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const toggleEraseBtn = document.getElementById('toggleEraseBtn');

let drawing = false;
let erasing = false;

// 캔버스 크기 조정
function resizeCanvas() {
  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;

  // CSS 기준 실제 렌더링 크기
  const cssWidth = container.clientWidth;
  const cssHeight = container.clientHeight;

  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  // 컨텍스트 스케일 조정
  ctx.setTransform(1, 0, 0, 1, 0, 0); 
  ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 공통 드로잉 함수
function startDrawing(x, y) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function drawLine(x, y) {
  if (!drawing) return;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  if (erasing) {
    ctx.globalCompositeOperation = 'destination-out'; 
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = colorPicker.value;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// 마우스 이벤트
canvas.addEventListener('mousedown', e => {
  const x = e.offsetX;
  const y = e.offsetY;
  startDrawing(x, y);
});
canvas.addEventListener('mousemove', e => drawLine(e.offsetX, e.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// 터치 이벤트
canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  startDrawing(x, y);
  e.preventDefault();
});

canvas.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  drawLine(x, y);
  e.preventDefault();
});

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// 지우개 버튼
function useEraser() {
  erasing = !erasing;
  toggleEraseBtn.classList.toggle('on', erasing);
}
toggleEraseBtn.addEventListener('click', useEraser);

// 전체 지우기
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
